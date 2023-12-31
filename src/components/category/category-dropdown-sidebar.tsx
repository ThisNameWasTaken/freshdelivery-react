import Alert from '@components/alert';
import Scrollbar from '@components/scrollbar';
import SidebarMenu from '@components/sidebar-menu';
import CategoryListCardLoader from '@components/loaders/category-list-card-loader';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import cn from 'classnames';

type CategorySidebarProps = {
  className?: string;
};

const CategoryDropdownSidebar: React.FC<CategorySidebarProps> = ({
  className,
}) => {
  const {
    data,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    limit: 10,
  });

  return (
    <aside
      className={cn(
        'lg:sticky lg:top-[6rem] category-mobile-sidebar',
        className
      )}
    >
      <div className="max-h-full overflow-hidden rounded border border-skin-base">
        {error ? (
          <div className="2xl:pe-10">
            <Alert message={error.message} />
          </div>
        ) : (
          <Scrollbar className="category-scrollbar w-full h-full">
            {loading && !data?.categories?.data?.length ? (
              Array.from({ length: 15 }).map((_, i) => (
                <CategoryListCardLoader
                  key={i}
                  uniqueKey="category-list-card-loader"
                />
              ))
            ) : (
              <SidebarMenu items={data?.categories?.data} />
            )}
          </Scrollbar>
        )}
      </div>
    </aside>
  );
};

export default CategoryDropdownSidebar;
