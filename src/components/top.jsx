export const Top = ({
  header = '',
  note = '',
  info = ''
}) => {
  return (
    <>
      <h2>{header}</h2>
      <p style={{ fontSize: '23px', marginBottom: '0px' }}>
        {note}
      </p>
      <span style={{ fontSize: '15px', paddingLeft: '30px', marginTop: '0px' }}>
        {info}
      </span>
    </>
  )
}