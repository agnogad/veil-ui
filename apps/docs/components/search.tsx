"use client";

import { useFlexsearchStatic } from "fumadocs-core/search/client/flexsearch-static";
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from "fumadocs-ui/components/dialog/search";

const searchIndex = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/search`;

export function StaticSearchDialog(props: SharedProps) {
  const search = useFlexsearchStatic({ from: searchIndex });

  return (
    <SearchDialog {...search} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList />
      </SearchDialogContent>
    </SearchDialog>
  );
}
