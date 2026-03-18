const { Client } = require('pg');

// Render에 설정한 DATABASE_URL 환경변수를 자동으로 불러옵니다.
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Neon/Render 연결을 위한 SSL 설정
  }
});

async function getName() {
  try {
    await client.connect();
    
    // test 테이블에서 레코드 하나만 조회 (가장 최근 데이터 기준)
    const res = await client.query('SELECT name FROM test LIMIT 1');
    
    if (res.rows.length > 0) {
      console.log(`HELLO ${res.rows[0].name}`);
    } else {
      console.log('데이터가 없습니다.');
    }
  } catch (err) {
    console.error('연결 오류:', err.stack);
  } finally {
    await client.end();
  }
}

getName();
