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

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumnList.map((col) => (
            <div key={col.title} className="flex flex-col gap-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-widest dark:text-white/95 text-gray-900">
                {col.title}
              </span>
              {col.linkList.map((link) => (
                <span key={link} className="text-sm leading-relaxed dark:text-white/75 dark:hover:text-white/95 text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">
                  {link}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-border-dark-soft pt-5">
          <div className="flex flex-wrap items-center gap-2 text-sm dark:text-white/60 text-gray-400">
            <span>© {new Date().getFullYear()} Airbnb, Inc. All rights reserved</span>
            {footerLegalLinkList.map((link) => (
              <span key={link} className="dark:hover:text-white/90 hover:text-gray-700 cursor-pointer transition-colors">
                · {link}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {footerLocaleList.map((label) => (
              <span key={label} className="cursor-pointer text-sm dark:text-white/80 dark:hover:text-white text-gray-500 hover:text-gray-900 transition-colors">
                {label}
              </span>
            ))}
          </div>
        </div>

      </HomeContainer>
    </footer>
  );
}
