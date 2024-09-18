"use client";
import { useSearchParams } from 'next/navigation';
import Searchresult from '@/app/_Components/Searchresult';
import React from 'react';
import {Suspense} from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  return (
    <>
      <Suspense fallback={<>Loading...</>}>

      <Searchresult query={query} />
      </Suspense>
    </>
  );
};

export default Page;
