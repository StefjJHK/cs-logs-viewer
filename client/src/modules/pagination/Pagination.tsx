import { Pagination as RsPagination } from 'rsuite';
import { ReactElement, useEffect, useState } from 'react';

export interface PaginationProps<TValue> {
  values: TValue[];
  countPerPage: number;
  onChange: (values: TValue[]) => void;
  className?: string;
}

export function Pagination<TValue>({ values, countPerPage, onChange, className }: PaginationProps<TValue>): ReactElement {
  const [activePage, setActivePage] = useState(1);
  const setActivePageWrapper = (page: number) => {
    if (onChange) {
      const current = (page - 1) * countPerPage;
      const nextValues = values.slice(current, current + countPerPage + 1);

      onChange(nextValues);
    }

    setActivePage(page);
  };

  useEffect(() => setActivePageWrapper(1), [values]);

  return (
    <RsPagination
      prev
      last
      next
      first
      size="md"
      limit={countPerPage}
      total={values.length}
      maxButtons={10}
      activePage={activePage}
      onChangePage={setActivePageWrapper}
      className={className}
    />
  );
}
