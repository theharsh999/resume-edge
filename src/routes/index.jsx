import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Builder } from '../pages/Builder';
import { Templates } from '../pages/Templates';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/builder" element={<Builder />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
