import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
export default () => {
  return (
    <Layout>
      <p>안녕하세요! React 테스트 페이지 입니다.</p>
      <p>
        <Link to="/scrum">Scrum으로 이동</Link>
      </p>
    </Layout>
  );
};