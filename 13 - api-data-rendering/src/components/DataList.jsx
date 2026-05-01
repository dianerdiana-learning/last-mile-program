function DataList({ data }) {
  return (
    <ul className='data-list'>
      {data.map((user) => (
        <li key={user.id} className='data-item'>
          <h3>{user.name}</h3>
          <p>
            <span className='label'>Email:</span> {user.email}
          </p>
          <p>
            <span className='label'>Phone:</span> {user.phone}
          </p>
          <p>
            <span className='label'>Company:</span> {user.company.name}
          </p>
          <p>
            <span className='label'>Website:</span>{' '}
            <a
              href={`https://${user.website}`}
              target='_blank'
              rel='noreferrer'
            >
              {user.website}
            </a>
          </p>
        </li>
      ))}
    </ul>
  );
}

export default DataList;
