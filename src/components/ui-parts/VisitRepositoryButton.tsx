// ---- Next ----
import Image from 'next/image';
// ---- Images ----
import githubLogo from '@images/githubLogo.svg';
// ---- KumaUI ----
import { css } from '@kuma-ui/core';

// ========== コンポーネント関数 ==========
export default function VisitRepositoryButton() {
  // -------- JSX --------
  return (
    <article>
      <a
        href="https://github.com/aima0410/done-time-logger"
        target="_blank"
        rel="noopener noreferrer"
        className={css`
          position: fixed;
          right: 2vw;
          bottom: 4dvh;
          display: block;
          width: 80px;
          @media (max-width: 500px) {
            width: 70px;
          }
        `}
      >
        <button
        className={css`
          display: grid;
          place-content: center;
          padding: 10%;
          background-color: #fff;
          border-radius: 50%;
          box-shadow: 1px 6px 7px #359d4d5f;
          transition:
            transform 300ms ease-out,
            opacity 300ms ease-out,
            box-shadow 300ms ease-out;
          &:hover {
            opacity: 0.8;
            transform: translateY(-3px);
          }
          &:active {
            transform: translateY(2px);
            box-shadow: none;
          }
        `}
        >
          <Image src={githubLogo} alt="GitHubのロゴマーク" width={50} height={50} />
        </button>
      </a>
    </article>
  );
}
