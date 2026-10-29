import { useEffect, useState } from 'react'

const emptyForm = {
  centerName: '',
  location: '',
  childCapacity: '',
  licensed: '',
}

export default function CenterForm({ center, onSubmit, onClose, saving }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setForm(center
      ? {
          centerName: center.centerName || '',
          location: center.location || '',
          childCapacity: center.childCapacity ?? '',
          licensed: typeof center.licensed === 'boolean' ? String(center.licensed) : '',
        }
      : emptyForm)
    setErrors({})
  }, [center])

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function submit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!form.centerName.trim()) nextErrors.centerName = 'Center name is required.'
    if (!form.location.trim()) nextErrors.location = 'Location is required.'
    const capacity = Number(form.childCapacity)
    if (!Number.isInteger(capacity) || capacity < 1 || capacity > 500) {
      nextErrors.childCapacity = 'Capacity must be a whole number between 1 and 500.'
    }
    if (form.licensed !== 'true' && form.licensed !== 'false') {
      nextErrors.licensed = 'Select Yes or No.'
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    onSubmit({
      centerName: form.centerName.trim(),
      location: form.location.trim(),
      childCapacity: capacity,
      licensed: form.licensed === 'true',
    })
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
        <div className="modal-header">
          <div>
            <span className="eyebrow">{center ? 'Update record' : 'New record'}</span>
            <h2 id="form-title">{center ? 'Edit daycare center' : 'Add daycare center'}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close form">×</button>
        </div>

        <form onSubmit={submit} noValidate>
          <label>
            Center name
            <input name="centerName" value={form.centerName} onChange={updateField} placeholder="Little Stars Daycare" autoFocus />
            {errors.centerName && <small className="field-error">{errors.centerName}</small>}
          </label>
          <label>
            Location
            <input name="location" value={form.location} onChange={updateField} placeholder="Vijayawada" />
            {errors.location && <small className="field-error">{errors.location}</small>}
          </label>
          <div className="form-row">
            <label>
              Child capacity
              <input name="childCapacity" type="number" min="1" max="500" value={form.childCapacity} onChange={updateField} placeholder="100" />
              {errors.childCapacity && <small className="field-error">{errors.childCapacity}</small>}
            </label>
            <label>
              Licensed
              <select name="licensed" value={form.licensed} onChange={updateField}>
                <option value="">Select status</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              {errors.licensed && <small className="field-error">{errors.licensed}</small>}
            </label>
          </div>
          <div className="modal-actions">
            <button className="button button-quiet" type="button" onClick={onClose}>Cancel</button>
            <button className="button button-primary" type="submit" disabled={saving}>
              {saving ? 'Saving…' : center ? 'Save changes' : 'Add center'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
