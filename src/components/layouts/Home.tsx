// ---- Next ----
import Image from 'next/image';
// ---- Images ----
// ---- Components ----
import Message from '@ui-parts/Message';
import IdealTimeLine from '@ui-parts/IdealTimeLine';

export default function Home() {
  return (
    <>
      Home
      { <Message />}
      <div>
        {/* <Image src={} alt={} /> */}
        <h3>ポケモン</h3>
        <p>レベル30</p>
        <div>グラフ</div>
      </div>
      <IdealTimeLine />
    </>
  );
}
