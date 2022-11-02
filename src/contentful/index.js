import { useCallback } from "react";
import { createClient } from "contentful";

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
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