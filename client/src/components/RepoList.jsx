import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <div>There are {props.repos.length} repos.</div>
    <table>
      {props.repos.map((repo) =>
        <tr>
          <th>{repo.username}</th>
          <th><a href={repo.url}>{repo.repo}</a></th>
          <th>{repo.forks}</th>
        </tr>
      )}
    </table>
  </div>
)

export default RepoList;