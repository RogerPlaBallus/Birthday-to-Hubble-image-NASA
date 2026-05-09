import { MENU_BACKGROUND_IMAGE_URL, monthNames } from '../constants';

interface MenuScreenProps {
  loading: boolean;
  fetchError: string;
  month: number;
  day: number;
  availableDays: number[];
  onMonthChange: (month: number) => void;
  onDayChange: (day: number) => void;
  onSubmit: (event: React.FormEvent) => void;
  showNoResult: boolean;
}

// Renders the fullscreen entry menu where users pick month/day.
export function MenuScreen({
  loading,
  fetchError,
  month,
  day,
  availableDays,
  onMonthChange,
  onDayChange,
  onSubmit,
  showNoResult,
}: MenuScreenProps) {
  return (
    <div className="relative min-h-screen overflow-hidden font-sans text-white">
      <img src={MENU_BACKGROUND_IMAGE_URL} alt="Nebula background" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/55 via-slate-800/45 to-rose-900/45" />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-4xl text-center">
          <h1 className="mb-8 text-5xl font-light tracking-tight text-white/95 sm:mb-12 sm:text-6xl">Select Your Birth Date</h1>

          {loading && (
            <div className="mx-auto max-w-md rounded-md bg-black/45 p-8">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              <p className="text-lg text-white/90">Loading Hubble data from NASA...</p>
            </div>
          )}

          {fetchError && !loading && (
            <div className="mx-auto max-w-md rounded-md bg-black/55 p-8 text-left">
              <p className="mb-4 text-base text-red-200">{fetchError}</p>
              <button onClick={() => window.location.reload()} className="bg-red-500 px-6 py-3 text-base font-semibold tracking-wide text-white transition hover:bg-red-600">
                Retry
              </button>
            </div>
          )}

          {!loading && !fetchError && (
            <>
              <form onSubmit={onSubmit} className="mx-auto flex max-w-3xl flex-col items-center gap-5 sm:gap-7">
                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                  <label htmlFor="month-select" className="sr-only">Select Month</label>
                  <select
                    id="month-select"
                    value={month}
                    onChange={(e) => onMonthChange(Number.parseInt(e.target.value, 10))}
                    className="h-14 w-full appearance-none bg-white px-4 text-center text-3xl font-semibold tracking-[0.14em] text-slate-900 focus:outline-none focus:ring-2 focus:ring-white/60 sm:text-4xl"
                  >
                    {monthNames.map((name, index) => (
                      <option key={name} value={index + 1}>{name.toUpperCase()}</option>
                    ))}
                  </select>

                  <label htmlFor="day-select" className="sr-only">Select Date</label>
                  <select
                    id="day-select"
                    value={day}
                    onChange={(e) => onDayChange(Number.parseInt(e.target.value, 10))}
                    className="h-14 w-full appearance-none bg-white px-4 text-center text-3xl font-semibold tracking-[0.08em] text-slate-900 focus:outline-none focus:ring-2 focus:ring-white/60 sm:text-4xl"
                  >
                    {availableDays.map((value) => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="bg-red-500 px-14 py-4 text-3xl font-semibold tracking-wide text-white transition hover:bg-red-600 active:bg-red-700">
                  SUBMIT
                </button>
              </form>

              {showNoResult && (
                <p className="mx-auto mt-6 max-w-md bg-black/55 px-4 py-3 text-sm text-red-200">
                  No image found for {monthNames[month - 1]} {day}. Try another date.
                </p>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
