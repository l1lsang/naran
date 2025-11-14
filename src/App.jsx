import React, { useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import 마우스 from './img/마우스.jpg';
import 경고 from './img/photo_2025-11-11_16-33-36.jpg';
import roll1 from "./img/1.jpg";
import roll2 from "./img/2.jpg";
import roll3 from "./img/3.jpg";
import roll4 from "./img/4.jpg";
import roll5 from "./img/5.jpg";
import roll6 from "./img/6.jpg";
import roll7 from "./img/7.jpg";
import roll8 from "./img/8.jpg";
import roll9 from "./img/9.jpg";
import roll10 from "./img/10.jpg";
import roll11 from "./img/11.jpg";
import 상담 from "./img/상담진행.png";


function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

function App() {
  // 알림
   const handleSubmit = async (e) => {
    e.preventDefault(); // 새로고침 방지

    try {
      // 폼 데이터 수집
      const form = e.target;
      const name = form.querySelector("input[placeholder='이름을 입력하세요']").value.trim();
      const phone = form.querySelector("input[placeholder=\"'-'없이 입력해 주세요\"]").value.trim();
      const debt = form.querySelector("input[placeholder='총 채무를 입력해 주세요']").value.trim();
      const payment = form.querySelector("input[placeholder='월 상환액을 입력해 주세요']").value.trim();
      const message = form.querySelector("textarea").value.trim();

      if (!name || !phone || !message || !debt || !payment) {
        alert("이름, 연락처, 문의 내용을 모두 입력해주세요.");
        return;
      }

      const data = { name, phone, debt, payment, message };

      // 🔥 Vercel API로 전송
      const response = await fetch("/api/submitConsult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await response.json();
      console.log("서버 응답:", json);

      if (response.ok) {
        alert("상담 신청이 정상적으로 접수되었습니다!");
        form.reset();
      } else {
        alert("서버 오류: " + json.error);
      }
    } catch (error) {
      console.error("🔥 fetch 오류:", error);
      alert("서버 통신 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } };

    useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
          else {
            // 👇 화면에서 사라지면 show 제거 → 다시 실행 가능
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.2 }
    );
        const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  return (
    <div>
      <header>
      <div className="대가리"><p className="마우스">{/*여기에 마우스 이미지 넣어야함*/}<img src={마우스} height="60px" width=""></img> 환수 가능성을 먼저 확인하세요! 범죄 피해액 환수, 아직 늦지 않았습니다.</p>
      <p className="피해">{/*법무법인 나란 이미지 많으면 넣어야함*/} <span className="제발">피해 회복 전문 로펌</span>  </p>
      </div>
      </header>
      <section className="hidden">
      <div className="배경">
        {/* 변호사 이미지 넣어야함 */} <h1 className="배경1">수사기관 신고는 <span className="배경1">범죄자 검거
          </span>에 중점을 두는 절차입니다.</h1>
          <h1 className="배경1"> 법무법인 나란은 피해자의 신속한 회복을 최우선으로 생각하며,</h1>
          <h2 className="배경1"><p className="배경1">접수 후 3일 이내에</p> <p className="배경1">피해 복구를 도와드립니다. </p>  </h2>
<button className="배경1" onClick={()=>scrollToSection("신청고고")}>   24시 상담 문의 &gt; </button>

     </div>
</section>
<section className="hidden">
<div className="전체절차"><div className="절차1"><p>일반적인 법적 절차만으로는</p><p>사기 피해금의 회수가 어렵습니다.</p></div>
<p className="절차2">주식,코인,팀미션,로맨스 스캠,해외선물,공모주,폰지,다단계,구매대행,</p>
<p className="절차2">대출,사칭, 조작 등 다양한 사기 유형은 각각 다른 대응이 필요합니다.</p>

<p className="절차3"><u className="절차3">사기 수법에 맞춰 상황별로 적절한 조치를 취하는 것이 중요합니다.</u></p>
</div>
</section>
<section>
<div className="컨테이너">
  <div className="카드 hidden 카드1">
  <p>코인/주식사기</p>
<h3>거래소사칭,</h3>
<h3>마진거래 블록딜,</h3>
<h3>비상장 코인, 비상장 주식,</h3>
<h3>마진거래, 해외선물,</h3>
<h3>공모주 사기 등 </h3>
</div>
<div className="카드 hidden 카드2">
  <p>부업사기</p>
<h3>틱톡 영상 수수료,</h3>
<h3>영화리뷰,</h3>
<h3>쇼핑몰 창업사기,</h3>
</div>
<div className="카드 hidden 카드3">
  <p>로맨스스캠</p>
<h3>로맨스스캠에서 연계되는 사기</h3>
<h3>SNS를 통해 낯선이성을 알게되지만</h3>
<h3>사랑을 빙자한 팀미션 부업사기, 코인 사기</h3>
</div>
<div className="카드 hidden 카드4">
  <div className="카드5">
  <p>다단계 폰지사 </p>
<h3>보통 100~1000주 마다 3%씩 수익금을 준다하며 접근 후,</h3>
<h3>2~3주 정도 수익금 지급 어느정도 신뢰를 쌓으며 프로젝트는 마무리가 되었지만,</h3>
<h3>추가 수익을 낼 수 있다며 더 높은 등급으로 업그레이드를 권유</h3>
<h3>더 많은 금액을 요구후 많은 수익금을 주겠다 약속하며 </h3>
<h3>지인들 또한 추천 권유, 금액은 점점 커지며 </h3>
<h3>나중에는 출금불가 혹은 수수료,인지세 요구</h3>
</div>
<div className="지갑">* 지갑대 지갑 이동은 수임이 불가능합니다. </div>

</div>

</div>
</section>
<section>
  <div className="다양한">
    <h4 className="다양한1"> 다양한 금융사기 • 사건 환불사례 </h4>

    {/* 🔥 여기 무한 롤링 시작 */}
    <div className="rolling-container">
      <div className="rolling-track">

        <div className="rolling-card">
          <img src={roll1} alt="roll1" />
        </div>

        <div className="rolling-card">
          <img src={roll2} alt="roll2" />
        </div>

        <div className="rolling-card">
          <img src={roll3} alt="roll3" />
        </div>

        <div className="rolling-card">
          <img src={roll4} alt="roll4" />
        </div>
        <div className="rolling-card">
          <img src={roll5} alt="roll5" />
        </div>

        <div className="rolling-card">
          <img src={roll6} alt="roll2" />
        </div>

        <div className="rolling-card">
          <img src={roll7} alt="roll3" />
        </div>

        <div className="rolling-card">
          <img src={roll8} alt="roll4" />
        </div>
        <div className="rolling-card">
          <img src={roll9} alt="roll4" />
        </div>
        <div className="rolling-card">
          <img src={roll10} alt="roll4" />
        </div>
        <div className="rolling-card">
          <img src={roll11} alt="roll4" />
        </div>

        
      </div>
    </div>
    {/* 🔥 무한 롤링 끝 */}

  </div>
</section>

<section>
<div>
  <h5 className="사기1"> 사기 피해 복구는 오직, 법무법인에서만 가능합니다.  </h5>
  <div className="피해1">
<p><u> 다양한 2차 피해를 유발하는 추가 사기가 발생하고 있습니다. </u></p>
<p><u>법무법인 나란, 피해회복전문로펌에서는 조속한 피해 대응이 가능합니다.</u></p></div>
<img src={상담신청}></img>
</div>
</section>
<section>
<div className="자신있게">
<p className="말씀"> 자신있게 말씀드리겠습니다! </p>
<p className="나란">법무법인 나란에서 해결하지 못한 사건은</p>
<p className="나란">대한민국 그 어디서도 해결할 수 없습니다.</p>
</div>
</section>
<section>
<div className="지금">
  <p className="바로">지금 바로 상담 받아보세요!</p>
  <div className="성공2">
  <p className="성공">법무법인 나란은 다양한 성공사례로</p>
  <p className="성공">고객님에게 알맞는 맞춤 컨설팅을 제공해드립니다.</p></div>
<form id="신청고고" onSubmit={handleSubmit}>
  <div class="row">
    <div class="col">
      <label>이름</label>
      <input type="text" placeholder="이름을 입력하세요" />
    </div>
    <div class="col">
      <label>연락처</label>
      <input type="text" placeholder="'-'없이 입력해 주세요" />
    </div>
  </div>

  <div class="row">
    <div class="col">
      <label>총 채무</label>
      <input type="text" placeholder="총 채무를 입력해 주세요" />
    </div>
    <div class="col">
      <label>월 상환액</label>
      <input type="text" placeholder="월 상환액을 입력해 주세요" />
    </div>
  </div>

  <div class="row">
    <label>문의 내용</label>
    <textarea placeholder="문의 내용을 입력해 주세요"></textarea>
  </div>

  <div class="agree">
    <label>
      <input type="checkbox" /> 개인정보 수집 및 이용에 동의함
    </label>
  </div>
<div className="바보">
  <img src={경고} height="25px"width="30px"></img>개인정보는 암호화되어 안전하게 처리됩니다
</div>
  <button type="submit">상담신청</button>
</form>

</div>
</section> 
<footer>
  <div className="푸터">
  <div className="하단">
    <p className="법무법인">법무법인 나란 본사무소</p>
    <div className="가로 row2">
      <div className="가로1">
    <p className="n">분사무소</p>
    <h6 className="n">서울 도봉구 도봉로 803 대연빌딩 1층</h6>
    </div>
    <div className="가로1">
    <p className="n">본사무소</p>
    <h6 className="n">서울 송파구 송파대로167 문정역테라타워 A동 315호</h6>
    </div>
    </div>
    <div className="가로 row3">
    <p className="n">사업자번호</p>
    <h6 className="n">221 - 85 - 21026</h6>
    </div>
    <div className="가로 row1">
    <p className="n">대표변호사</p>
    <h6 className="n">서지원, 최지연</h6>
    </div>
    <div className="가로">
    <p className="s">Copyrights @ 2024 All Rights Reserved by NARAN</p>
    </div>
  </div>
  </div>
</footer>

    </div>
  );
}

export default App;