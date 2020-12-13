# school api 개인 프로젝트

+ node.js 공부하면서 만든 프로젝트

# Javascript, Mysql, AWS, Docker, Swagger

+ 프로그램 언어는 자바스크립트, 데이터베이스는 mysql로 작업함
+ 도커를 이용하여 아마존 클라우드 서버에 배포
+ 협업 툴로 swagger 추가

# rest-api

rest-api 를 따르고 있고, 이에 따라 CRUD 구현

# 프로젝트 구조

server/routes/
+ rest-api 형식을 따르고 CRUD 작성
+ async/await 으로 비동기 처리
+ try/catch 예외처리와 에러처리

server/models/
+ mysql 쿼리문 작성
+ 쿼리문은 server//components/db에 의해 실제 데이터베이스에 적용

server//components/db
+ Promise 로 쿼리, 트랜젝션, 커밋, 롤백 구현

# Overview

+ node.js와 express의 기본을 배움
+ javascript 언어에 능숙해지는 계기가 됨
+ mysql의 쿼리문과 동작 방식 숙지
+ AWS에 데이터베이스 서버(RDS)와 배포서버(EC2) 두개를 올림
+ Docker의 개념과 필요성 및 사용법 인지
+ 서버의 개념과 서비스의 전체적인 윤곽을 경험
