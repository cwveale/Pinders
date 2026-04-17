function Estimate({ open, onClose }) {
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({
    services: [], size: "medium", addr: "", zip: "", name: "", email: "", phone: "",
    date: null, time: null, notes: "",
  });

  React.useEffect(() => {
    if (open) { setStep(0); }
  }, [open]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const toggleService = (id) => {
    setForm(f => ({ ...f, services: f.services.includes(id) ? f.services.filter(x => x !== id) : [...f.services, id] }));
  };

  const today = new Date();
  const days = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i - today.getDay());
    return d;
  });
  const monthLabel = today.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const isBookable = (d) => {
    const diff = (d - today) / (1000*60*60*24);
    if (diff < 0.5) return false;
    if (d.getDay() === 0) return false;
    const busy = [2, 5, 9, 16, 22];
    if (busy.includes(d.getDate())) return false;
    return true;
  };

  const timeSlots = [
    "7:30 AM", "9:00 AM", "10:30 AM",
    "12:30 PM", "2:00 PM", "3:30 PM", "5:00 PM"
  ];

  const steps = ["Services", "Property", "Schedule", "Contact", "Done"];
  const canAdvance = () => {
    if (step === 0) return form.services.length > 0;
    if (step === 1) return form.addr.length > 2 && /^\d{5}$/.test(form.zip);
    if (step === 2) return form.date && form.time;
    if (step === 3) return form.name && form.email.includes("@") && form.phone.length >= 7;
    return true;
  };

  return (
    <>
      <div style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(11,20,16,0.7)",
        backdropFilter: "blur(10px)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity .3s",
      }} onClick={onClose}/>

      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 101,
        width: "min(680px, 100vw)",
        background: "var(--bone)", color: "var(--ink)",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform .4s cubic-bezier(.2,.8,.2,1)",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        <div style={{
          padding: "22px 32px", borderBottom: "1px solid var(--line-dark)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div className="mono" style={{ color: "var(--moss)", marginBottom: 4 }}>Free estimate</div>
            <div className="serif" style={{ fontSize: 22, fontWeight: 400, color: "var(--forest)" }}>
              {step === 4 ? "You're booked." : "Let's walk your property."}
            </div>
          </div>
          <button onClick={onClose} style={{ padding: 8 }}><Icon.close/></button>
        </div>

        {step < 4 && (
          <div style={{ padding: "18px 32px", borderBottom: "1px solid var(--line-dark)", display: "flex", gap: 8, alignItems: "center" }}>
            {steps.slice(0, 4).map((s, i) => (
              <React.Fragment key={s}>
                <div className="mono" style={{
                  display: "flex", alignItems: "center", gap: 8,
                  color: i === step ? "var(--forest)" : i < step ? "var(--moss)" : "rgba(11,20,16,0.35)",
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: 999, fontSize: 10,
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    background: i <= step ? "var(--forest)" : "transparent",
                    color: i <= step ? "var(--lime)" : "rgba(11,20,16,0.4)",
                    border: i <= step ? "none" : "1px solid var(--line-dark)",
                  }}>{i < step ? <Icon.check/> : i + 1}</span>
                  {s}
                </div>
                {i < 3 && <div style={{ flex: 1, height: 1, background: i < step ? "var(--moss)" : "var(--line-dark)" }}/>}
              </React.Fragment>
            ))}
          </div>
        )}

        <div style={{ flex: 1, overflow: "auto", padding: 32 }}>
          {step === 0 && (
            <div>
              <h3 className="serif" style={{ fontSize: 32, fontWeight: 400, color: "var(--forest)", marginBottom: 8, letterSpacing: "-0.02em" }}>
                What would you like done?
              </h3>
              <p style={{ color: "rgba(11,20,16,0.6)", marginBottom: 24 }}>Select all that apply. You can change your mind later.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {DATA.services.map(s => {
                  const on = form.services.includes(s.id);
                  return (
                    <button key={s.id} onClick={() => toggleService(s.id)} style={{
                      padding: "18px 18px", textAlign: "left",
                      border: on ? "1.5px solid var(--forest)" : "1px solid var(--line-dark)",
                      background: on ? "var(--forest)" : "transparent",
                      color: on ? "var(--lime)" : "var(--forest)",
                      borderRadius: 2, transition: "all .15s",
                      position: "relative",
                    }}>
                      <div className="serif" style={{ fontSize: 20, fontWeight: 400, marginBottom: 4 }}>
                        {s.title}
                      </div>
                      <div style={{ fontSize: 12, color: on ? "rgba(199,217,122,0.7)" : "rgba(11,20,16,0.55)" }}>
                        {s.price}
                      </div>
                      {on && <div style={{ position: "absolute", top: 14, right: 14, color: "var(--lime)" }}><Icon.check/></div>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="serif" style={{ fontSize: 32, fontWeight: 400, color: "var(--forest)", marginBottom: 8, letterSpacing: "-0.02em" }}>
                Where is it?
              </h3>
              <p style={{ color: "rgba(11,20,16,0.6)", marginBottom: 24 }}>We use your address to plan the drive — nothing else.</p>
              <div style={{ display: "grid", gap: 14 }}>
                <Field label="Street address" value={form.addr} onChange={v => setForm({...form, addr: v})} placeholder="123 Kings Grant Dr" />
                <Field label="Zip code" value={form.zip} onChange={v => setForm({...form, zip: v.replace(/\D/g,"").slice(0,5)})} placeholder="08053" mono />
                <div>
                  <div className="mono" style={{ color: "var(--moss)", marginBottom: 10 }}>Lot size (roughly)</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                    {[["small","< ¼ acre"], ["medium","¼ – ½"], ["large","½ – 1"], ["xl","1+ acres"]].map(([k, v]) => (
                      <button key={k} onClick={() => setForm({...form, size: k})} style={{
                        padding: "16px 8px",
                        border: form.size === k ? "1.5px solid var(--forest)" : "1px solid var(--line-dark)",
                        background: form.size === k ? "var(--forest)" : "transparent",
                        color: form.size === k ? "var(--lime)" : "var(--forest)",
                        borderRadius: 2, fontSize: 13, fontWeight: 500,
                      }}>{v}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="serif" style={{ fontSize: 32, fontWeight: 400, color: "var(--forest)", marginBottom: 8, letterSpacing: "-0.02em" }}>
                Pick a day to meet.
              </h3>
              <p style={{ color: "rgba(11,20,16,0.6)", marginBottom: 24 }}>Free, on-site, about 20 minutes. We'll show up on the dot.</p>

              <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 20 }} className="cal-grid">
                <div style={{ border: "1px solid var(--line-dark)", padding: 16, borderRadius: 2 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span className="serif" style={{ fontSize: 18, color: "var(--forest)" }}>{monthLabel}</span>
                    <span className="mono" style={{ color: "var(--sage)" }}>◉ {days.filter(isBookable).length} open</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
                    {["S","M","T","W","T","F","S"].map((d, i) => (
                      <div key={i} className="mono" style={{ textAlign: "center", fontSize: 9, color: "rgba(11,20,16,0.4)", padding: 4 }}>{d}</div>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
                    {days.map((d, i) => {
                      const bookable = isBookable(d);
                      const selected = form.date && form.date.toDateString() === d.toDateString();
                      const isToday = d.toDateString() === today.toDateString();
                      return (
                        <button key={i}
                          disabled={!bookable}
                          onClick={() => setForm({...form, date: d, time: null})}
                          style={{
                            aspectRatio: "1", fontSize: 13, borderRadius: 2,
                            border: selected ? "1.5px solid var(--forest)" : isToday ? "1px dashed var(--moss)" : "1px solid transparent",
                            background: selected ? "var(--forest)" : bookable ? "rgba(31,58,42,0.05)" : "transparent",
                            color: selected ? "var(--lime)" : bookable ? "var(--forest)" : "rgba(11,20,16,0.25)",
                            cursor: bookable ? "pointer" : "not-allowed",
                            textDecoration: !bookable && d >= today ? "line-through" : "none",
                          }}>
                          {d.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="mono" style={{ color: "var(--moss)", marginBottom: 10 }}>
                    {form.date ? form.date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }) : "Pick a day first"}
                  </div>
                  <div style={{ display: "grid", gap: 6 }}>
                    {timeSlots.map(t => {
                      const disabled = !form.date;
                      const sel = form.time === t;
                      const taken = form.date && [1, 4].includes((form.date.getDate() + timeSlots.indexOf(t)) % 5);
                      return (
                        <button key={t}
                          disabled={disabled || taken}
                          onClick={() => setForm({...form, time: t})}
                          style={{
                            padding: "12px 14px", textAlign: "left",
                            border: sel ? "1.5px solid var(--forest)" : "1px solid var(--line-dark)",
                            background: sel ? "var(--forest)" : "transparent",
                            color: sel ? "var(--lime)" : taken ? "rgba(11,20,16,0.3)" : "var(--forest)",
                            borderRadius: 2, fontSize: 13,
                            display: "flex", justifyContent: "space-between",
                            opacity: disabled ? 0.5 : 1,
                          }}>
                          <span>{t}</span>
                          {taken && <span className="mono" style={{ fontSize: 10 }}>taken</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <style>{`@media (max-width: 560px) { .cal-grid { grid-template-columns: 1fr !important; } }`}</style>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="serif" style={{ fontSize: 32, fontWeight: 400, color: "var(--forest)", marginBottom: 8, letterSpacing: "-0.02em" }}>
                How do we reach you?
              </h3>
              <p style={{ color: "rgba(11,20,16,0.6)", marginBottom: 24 }}>We'll text to confirm and send a reminder the night before.</p>
              <div style={{ display: "grid", gap: 14 }}>
                <Field label="Name" value={form.name} onChange={v => setForm({...form, name: v})} />
                <Field label="Email" value={form.email} onChange={v => setForm({...form, email: v})} />
                <Field label="Phone" value={form.phone} onChange={v => setForm({...form, phone: v})} />
                <Field label="Anything else we should know?" textarea value={form.notes} onChange={v => setForm({...form, notes: v})}
                       placeholder="Dogs, gate codes, soft spots in the lawn…" />
              </div>
            </div>
          )}

          {step === 4 && (
            <div style={{ paddingTop: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 999,
                background: "var(--lime)", color: "var(--forest)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 24,
              }}>
                <Icon.check style={{ width: 22, height: 22 }}/>
              </div>
              <h3 className="serif" style={{ fontSize: 40, fontWeight: 400, color: "var(--forest)", marginBottom: 12, letterSpacing: "-0.02em" }}>
                See you {form.date ? form.date.toLocaleDateString("en-US", { weekday: "long" }) : "soon"}.
              </h3>
              <p style={{ color: "rgba(11,20,16,0.7)", marginBottom: 28, fontSize: 15, lineHeight: 1.6 }}>
                Confirmation is on the way to <strong>{form.email}</strong>. We'll arrive {form.date?.toLocaleDateString("en-US", { month: "short", day: "numeric" })} around {form.time}. Don't worry about cleaning up — we know what a yard looks like.
              </p>
              <div style={{ padding: 20, background: "rgba(31,58,42,0.06)", borderRadius: 2, marginBottom: 20 }}>
                <div className="mono" style={{ color: "var(--moss)", marginBottom: 14 }}>Visit summary</div>
                <div style={{ display: "grid", gap: 10, fontSize: 14 }}>
                  <Row k="Services" v={form.services.map(id => DATA.services.find(s => s.id === id)?.title).join(", ")}/>
                  <Row k="Address" v={`${form.addr}, ${form.zip}`}/>
                  <Row k="Lot" v={({small: "< ¼ acre", medium: "¼ – ½ acre", large: "½ – 1 acre", xl: "1+ acres"})[form.size]}/>
                  <Row k="When" v={`${form.date?.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} · ${form.time}`}/>
                </div>
              </div>
              <button onClick={onClose} style={{
                padding: "14px 22px", background: "var(--forest)", color: "var(--lime)",
                borderRadius: 999, fontSize: 14, fontWeight: 500,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                Back to browsing <Icon.arrow/>
              </button>
            </div>
          )}
        </div>

        {step < 4 && (
          <div style={{
            padding: "16px 32px", borderTop: "1px solid var(--line-dark)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: "var(--paper)",
          }}>
            <button onClick={() => step > 0 ? setStep(step - 1) : onClose()} style={{
              fontSize: 13, color: "var(--forest)", padding: "10px 14px",
            }}>
              {step === 0 ? "Cancel" : "← Back"}
            </button>
            <div className="mono" style={{ color: "rgba(11,20,16,0.5)" }}>{step + 1} of 4</div>
            <button
              disabled={!canAdvance()}
              onClick={() => setStep(step + 1)}
              style={{
                padding: "12px 22px", background: canAdvance() ? "var(--forest)" : "var(--line-dark)",
                color: canAdvance() ? "var(--lime)" : "rgba(11,20,16,0.4)",
                borderRadius: 999, fontSize: 13, fontWeight: 500,
                display: "flex", alignItems: "center", gap: 8,
                cursor: canAdvance() ? "pointer" : "not-allowed",
              }}>
              {step === 3 ? "Book visit" : "Continue"} <Icon.arrow/>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function Field({ label, value, onChange, placeholder, textarea, mono }) {
  const Cmp = textarea ? "textarea" : "input";
  return (
    <label style={{ display: "block" }}>
      <div className="mono" style={{ color: "var(--moss)", marginBottom: 8 }}>{label}</div>
      <Cmp
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={textarea ? 3 : undefined}
        style={{
          width: "100%", padding: "14px 16px",
          background: "transparent", border: "1px solid var(--line-dark)",
          color: "var(--forest)", fontSize: 15, borderRadius: 2,
          fontFamily: mono ? "var(--mono)" : "inherit",
          letterSpacing: mono ? "0.1em" : "normal",
          outline: "none", resize: "vertical",
        }}
        onFocus={e => e.currentTarget.style.borderColor = "var(--forest)"}
        onBlur={e => e.currentTarget.style.borderColor = "var(--line-dark)"}
      />
    </label>
  );
}

function Row({ k, v }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 12 }}>
      <span className="mono" style={{ color: "rgba(11,20,16,0.5)" }}>{k}</span>
      <span>{v}</span>
    </div>
  );
}

window.Estimate = Estimate;
