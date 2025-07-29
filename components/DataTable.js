'use client';
import React, { useState, useMemo } from 'react';
import styles from '../styles/DataTable.module.css'; // Note the import change

const mockData = [
  { id: 1, name: 'Alice', email: 'alice@email.com', revenue: 2000 },
  { id: 2, name: 'Bob', email: 'bob@email.com', revenue: 1500 },
  { id: 3, name: 'Charlie', email: 'charlie@email.com', revenue: 3000 },
  { id: 4, name: 'David', email: 'david@email.com', revenue: 1200 },
  { id: 5, name: 'Eva', email: 'eva@email.com', revenue: 1800 },
  { id: 6, name: 'Frank', email: 'frank@email.com', revenue: 2500 },
  { id: 7, name: 'Grace', email: 'grace@email.com', revenue: 1700 },
  { id: 8, name: 'Henry', email: 'henry@email.com', revenue: 2700 },
];

export default function DataTable() {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const filteredData = useMemo(() => {
    let filtered = mockData.filter(row =>
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase())
    );
    if (sortField) {
      filtered.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        if (typeof aVal === 'string') {
          return sortAsc
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        } else {
          return sortAsc ? aVal - bVal : bVal - aVal;
        }
      });
    }
    return filtered;
  }, [search, sortField, sortAsc]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className={styles.dataTableContainer}>
      <div className={styles.tableHeader}>
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>
              Name {sortField === 'name' && (sortAsc ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('email')}>
              Email {sortField === 'email' && (sortAsc ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('revenue')}>
              Revenue {sortField === 'revenue' && (sortAsc ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map(row => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>${row.revenue.toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="3">No results found</td></tr>
          )}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button 
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}