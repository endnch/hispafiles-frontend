export default (theme) => ({
  color: theme.fgColor,
  fontSize: '90%',

  '.replymode': {
    background: theme.bgAccent,
    color: theme.fgAccent,
    paddingTop: '10px',
    paddingBottom: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '120%',
  },

  hr: {
    height: '1px',
    backgroundColor: theme.dividerColor,
    border: 'none',
  },

  '.thumb': {
    border: 'none',
    float: 'left',
    marginTop: '2px',
    marginBottom: '10px',
    marginLeft: '20px',
    marginRight: '20px',
    maxHeight: '250px',
  },

  table: {
    margin: '4px',
  },

  '.doubledash': {
    color: theme.doubledash,
    verticalAlign: 'top',
  },

  'blockquote:last-child': {
    marginBottom: '0em',
  },

  '.reply': {
    background: theme.pbBackground,
    color: theme.pbForeground,
    border: `1px solid ${theme.pbBorder}`,
    padding: '5px',
  },

  '.unkfunc': {
    background: 'inherit',
    color: theme.greentext,
  },

  '.redtext': {
    color: '#e0727f',
  },

  '.filetitle': {
    color: theme.filetitle,
    fontWeight: 'bold',
  },

  'input[type="checkbox"], \
  .filetitle, \
  .bandera, \
  .anonid, \
  .timer, \
  .reflink2, \
  .filesize a, \
  .badge, \
  .postername, \
  .reflinks': {
    marginRight: '0.3em',
  },

  '.filesize': {
    marginLeft: '20px',
  },

  '.filesize > span': {
    fontSize: '85%'
  },

  '.anonid': {
    display: 'inline-block',
    fontSize: '80%',
    padding: '2px 5px',
    borderRadius: '4px',
    textShadow: '1px 1px black',
    color: 'white',
  },

  '.badge': {
    display: 'inline-block',
    fontSize: '80%',
    background: theme.badgeBg,
    color: theme.badgeColor,
    padding: '2px 5px',
    borderRadius: '4px',
  },

  '.timer': {
    fontSize: '90%',
  },

  '.replybacklinks': {
    fontSize: '85%',
  },

  '.highlight': {
    background: theme.highlightBg,
    color: theme.highlightFg,
    border: `1px solid ${theme.highlightBo}`,
    borderRadius: '5px',
  },

  '.postername': {
    fontWeight: 'bold',
    color: theme.postername,
  },

  '.code': {
    background: theme.codeBg,
    border: `1px solid ${theme.codeBorder}`,
    overflow: 'auto',
    padding: '10px !important',
    maxWidth: '102% !important',
    maxHeight: '400px',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    overflowX: 'hidden',
    fontSize: '120%',
    marginTop: '10px',
    marginBottom: '-5px',
  },
})
