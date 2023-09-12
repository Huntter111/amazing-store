import { useCallback } from "react";
import { createClient } from "contentful";
import {CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID} from "../env";

const client = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

export function useGetContentfulEntries() {
  const getEntries = useCallback(
    (contentType, select) =>
      client
        .getEntries({
          content_type: contentType,
          select,
        })
        .then(({ total, items }) => {
          return { total, items };
        }),
    []
  );

  return getEntries;
}