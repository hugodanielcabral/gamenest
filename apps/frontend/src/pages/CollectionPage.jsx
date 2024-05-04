import collectionBackground from "../assets/backgrounds/collection-background.webp";
import { useCollection } from "../context/CollectionContext";
import { Loading } from "../components/ui/index.js";
import { CollectionSearch } from "../components/collection/search/CollectionSearch.jsx";
import { useEffect } from "react";
import { CollectionList } from "../components/collection/list/CollectionList.jsx";
import { Layout } from "../components/layout/Layout.jsx";

export const CollectionPage = () => {
  const { collectionData, isLoading, getCollection } = useCollection();

  useEffect(() => {
    getCollection();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <Layout>
      <img
        src={collectionBackground}
        className="w-full absolute left-0 right-0 gradient-mask-b-[rgb(0,0,0,1),rgb(0,0,0,0.4)_40%,rgb(0,0,0,0)]"
      />
      <article className="relative z-10 p-4 container mx-auto grid-cols-4 grid gap-y-5 gap-x-10">
        <section className="col-span-4 md:col-span-3">
          <CollectionSearch />
        </section>
        <CollectionList collectionData={collectionData} />

        <section className="hidden md:block p-4 md:col-span-1 h-[350px]">
          <aside>
            <article className="bg-black p-4 h-[100px] border-4 border-white"></article>
            <article className="bg-black p-4 h-[100px] border-4 border-white"></article>
            <article className="bg-black p-4 h-[100px] border-4 border-white"></article>
          </aside>
        </section>
      </article>
    </Layout>
  );
};
