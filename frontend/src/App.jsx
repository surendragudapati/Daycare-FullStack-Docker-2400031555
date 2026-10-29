
import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import CenterForm from './components/CenterForm';
import CenterTable from './components/CenterTable';
import {
  createCenter,
  getCenters,
  removeCenter,
  updateCenter,
} from './services/daycareApi';

function App() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [search, setSearch] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [formCenter, setFormCenter] = useState(null);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  async function loadCenters() {
    setLoading(true);
    setError('');

    try {
      const data = await getCenters();
      setCenters(data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCenters();
  }, []);

  const visibleCenters = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return centers;

    return centers.filter((center) =>
      (center.centerName || '').toLowerCase().includes(query) ||
      (center.location || '').toLowerCase().includes(query)
    );
  }, [centers, search]);

  const summary = useMemo(
    () => ({
      centers: centers.length,
      capacity: centers.reduce(
        (total, center) => total + (Number(center.childCapacity) || 0),
        0
      ),
      licensed: centers.filter((center) => center.licensed).length,
    }),
    [centers]
  );

  function openAddForm() {
    setFormCenter(null);
    setFormOpen(true);
    setError('');
    setNotice('');
  }

  function openEditForm(center) {
    if (center.id === undefined || center.id === null) {
      setError('Cannot edit this center because its ID is missing.');
      return;
    }

    setFormCenter(center);
    setFormOpen(true);
    setError('');
    setNotice('');
  }

  function closeForm() {
    setFormOpen(false);
    setFormCenter(null);
  }

  async function saveCenter(data) {
    setSaving(true);
    setError('');
    setNotice('');

    try {
      if (formCenter !== null) {
        if (formCenter.id === undefined || formCenter.id === null) {
          throw new Error('Cannot update daycare center: ID is missing.');
        }

        await updateCenter(formCenter.id, data);
        setNotice('Center updated successfully.');
      } else {
        await createCenter(data);
        setNotice('Center added successfully.');
      }

      closeForm();
      await loadCenters();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteCenter(center) {
    if (center.id === undefined || center.id === null) {
      setError('Cannot delete this center because its ID is missing.');
      return;
    }

    if (
      !window.confirm(
        `Delete "${center.centerName}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    setDeletingId(center.id);
    setError('');
    setNotice('');

    try {
      await removeCenter(center.id);
      setNotice('Center deleted successfully.');
      await loadCenters();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="app-shell">
      <Navbar />

      <main className="page">
        <header className="page-header">
          <div>
            <span className="eyebrow">Overview</span>
            <h1>Daycare centers</h1>
            <p>
              Keep your centers, capacity, and licensing details organized.
            </p>
          </div>

          <button
            className="button button-primary add-button"
            type="button"
            onClick={openAddForm}
          >
            <span aria-hidden="true">+</span> Add center
          </button>
        </header>

        {notice && (
          <div className="feedback success" role="status">
            {notice}
            <button
              type="button"
              onClick={() => setNotice('')}
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
        )}

        {error && (
          <div className="feedback error" role="alert">
            {error}
            <button
              type="button"
              onClick={() => setError('')}
              aria-label="Dismiss error"
            >
              ×
            </button>
          </div>
        )}

        <SummaryCards summary={summary} />

        <section className="management-panel">
          <div className="section-header">
            <div>
              <h2>All centers</h2>
              <span className="record-count">
                {centers.length}{' '}
                {centers.length === 1 ? 'record' : 'records'}
              </span>
            </div>

            <div className="search-wrap">
              <span aria-hidden="true">⌕</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search centers…"
                aria-label="Search centers"
              />
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <span className="spinner" /> Loading centers…
            </div>
          ) : (
            <CenterTable
              centers={visibleCenters}
              onEdit={openEditForm}
              onDelete={deleteCenter}
              deletingId={deletingId}
            />
          )}
        </section>
      </main>

      {formOpen && (
        <CenterForm
          center={formCenter}
          onSubmit={saveCenter}
          onClose={closeForm}
          saving={saving}
        />
      )}
    </div>
  );
}

export default App;
