import React, { useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Loader from "./Loader";
import { Suspense } from "react";
import Footer from "./Footer";
import PathConstants from './routes/PathConstants';

export default function Layout() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (term) => {
    setSearchTerm(term);
     // Navigate to the products page on search
     navigate(PathConstants.PRODUCTS);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <main style={{ marginTop: '55px', marginBottom: '20px' }}>
        <Suspense fallback={<Loader />}>
          <Outlet context={{ searchTerm }} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
