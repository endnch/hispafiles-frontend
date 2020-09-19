import React, { useReducer, useCallback } from 'react'
import { Search } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import debounce from 'lodash.debounce'

import settings from '../settings'

const initialState = {
  loading: false,
  results: [],
  value: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'UPDATE_VALUE':
      return { ...state, value: action.value }
    case 'START_SEARCH':
      return { ...state, loading: true }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results }
    default:
      throw new Error()
  }
}

const SearchBar = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { loading, results, value } = state
  const history = useHistory()

  const getResults = useCallback(
    debounce(async (e, data) => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' })
        return
      }

      dispatch({ type: 'START_SEARCH', query: data.value })

      const response = await fetch(
        `${settings.site.url}/api/hispafiles/ui-search/${data.value}`
      )
      const json = await response.json()

      if (json.totalResults === 0) {
        dispatch({
          type: 'FINISH_SEARCH',
          results: [{ title: 'No hay resultados' }],
        })
        return
      }

      const moreResults =
        json.totalResults > 4
          ? [
              {
                url: `/search/${data.value}`,
                title: `Ver todos los resultados (${json.totalResults})`,
              },
            ]
          : []

      dispatch({
        type: 'FINISH_SEARCH',
        results: [
          ...json.results.map((x) => ({
            ...x,
            image: settings.site.url + x.image,
          })),
          ...moreResults,
        ],
      })
    }, 1000),
    []
  )

  const handleSearchChange = (e, data) => {
    dispatch({ type: 'UPDATE_VALUE', value: data.value })
    getResults(e, data)
  }

  const handleResultSelect = (e, data) => {
    history.push(data.result.url)
  }

  return (
    <Search
      size="mini"
      icon="search"
      placeholder="Buscar Hilos..."
      noResultsMessage="No hay resultados"
      loading={loading}
      results={results}
      value={value}
      showNoResults={false}
      onSearchChange={handleSearchChange}
      onResultSelect={handleResultSelect}
    />
  )
}

export default SearchBar