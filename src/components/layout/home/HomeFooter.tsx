import {
  footerColumnList,
  footerLegalLinkList,
  footerLocaleList,
} from "./home-layout.constants";
import HomeContainer from "./HomeContainer";

export default function HomeFooter() {
  return (
    <footer className="border-t border-border-dark bg-surface-dark">
      <HomeContainer className="py-10">

        {/* Columns */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumnList.map((col) => (
            <div key={col.title} className="flex flex-col gap-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-white/95">
                {col.title}
              </span>
              {col.linkList.map((link) => (
                <span key={link} className="text-sm leading-relaxed text-white/75 hover:text-white/95 cursor-pointer transition-colors">
                  {link}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-border-dark-soft pt-5">
          <div className="flex flex-wrap items-center gap-2 text-sm text-white/60">
            <span>© {new Date().getFullYear()} Airbnb, Inc. All rights reserved</span>
            {footerLegalLinkList.map((link) => (
              <span key={link} className="hover:text-white/90 cursor-pointer transition-colors">
                · {link}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {footerLocaleList.map((label) => (
              <span key={label} className="cursor-pointer text-sm text-white/80 transition-colors hover:text-white">
                {label}
              </span>
            ))}
          </div>
        </div>

      </HomeContainer>
    </footer>
  );
}
