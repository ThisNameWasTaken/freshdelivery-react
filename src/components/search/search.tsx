import React, { useState } from 'react';
import cn from 'classnames';
import { useSearchQuery } from '@framework/product/use-search';
import SearchBox from '@components/search/search-box';
import SearchProduct from '@components/search/search-product';
import SearchResultLoader from '@components/loaders/search-result-loader';
import useFreezeBodyScroll from '@utils/use-freeze-body-scroll';
import Scrollbar from '@components/scrollbar';
import { useUI } from '@contexts/ui.context';
import { useWindowSize } from 'react-use';

type Props = {
  className?: string;
  searchId?: string;
};

const Search = React.forwardRef<HTMLDivElement, Props>(
  ({ className = 'md:w-[730px] 2xl:w-[800px]', searchId = 'search' }, ref) => {
    const {
      displayMobileSearch,
      closeMobileSearch,
      displaySearch,
      closeSearch,
    } = useUI();
    const [searchText, setSearchText] = useState('');
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const { data, isLoading } = useSearchQuery({
      text: searchText,
    });
    const windowSize = useWindowSize();
    useFreezeBodyScroll(
      windowSize.width < 1024 &&
        (inputFocus === true || displaySearch || displayMobileSearch)
    );
    function handleSearch(e: React.SyntheticEvent) {
      e.preventDefault();
    }
    function handleAutoSearch(e: React.FormEvent<HTMLInputElement>) {
      setSearchText(e.currentTarget.value);
    }
    function clear() {
      setSearchText('');
      setInputFocus(false);
      closeMobileSearch();
      closeSearch();
    }
    function enableInputFocus() {
      setInputFocus(true);
    }

    return (
      <div
        ref={ref}
        className={cn(
          'w-full transition-all duration-200 ease-in-out',
          className
        )}
      >
        <div
          className={cn(
            'overlay cursor-pointer',
            windowSize.width < 1024 && {
              open: displayMobileSearch,
              'input-focus-overlay-open': inputFocus === true,
              'open-search-overlay': displaySearch,
            }
          )}
          onClick={() => clear()}
        />

        <div className="w-full flex flex-col justify-center flex-shrink-0 relative z-30">
          <div className="flex flex-col mx-auto w-full">
            <SearchBox
              searchId={searchId}
              name="search"
              value={searchText}
              onSubmit={handleSearch}
              onChange={handleAutoSearch}
              onClear={clear}
              onFocus={() => enableInputFocus()}
            />
          </div>

          {searchText && (
            <div className="w-full absolute top-[56px] start-0 py-2.5 bg-skin-fill rounded-md flex flex-col overflow-hidden shadow-dropDown z-30">
              <Scrollbar className="os-host-flexbox">
                <div className="w-full h-[380px]">
                  {isLoading
                    ? Array.from({ length: 15 }).map((_, i) => (
                        <div
                          key={i}
                          className="py-2.5 ps-5 pe-10 scroll-snap-align-start"
                        >
                          <SearchResultLoader />
                        </div>
                      ))
                    : data?.map((item) => (
                        <div
                          key={item.id}
                          className="py-2.5 ps-5 pe-10 scroll-snap-align-start transition-colors duration-200 hover:bg-skin-two"
                          onClick={clear}
                        >
                          <SearchProduct item={item} />
                        </div>
                      ))}
                </div>
              </Scrollbar>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Search.displayName = 'Search';

export default Search;
