import { useCallback, useState } from 'react';
import { FullscreenViewer } from './features/hubble/components/FullscreenViewer';
import { MenuScreen } from './features/hubble/components/MenuScreen';
import { useHubbleData } from './features/hubble/hooks/useHubbleData';
import type { HubbleEntry } from './features/hubble/types';
import { createDateKey, buildImageUrl, getDaysInMonth } from './features/hubble/utils/helpers';

// Coordinates data loading, date selection, and view switching.
export default function App() {
  const { entryMap, loading, fetchError } = useHubbleData();

  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [result, setResult] = useState<HubbleEntry | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  const availableDays = Array.from({ length: getDaysInMonth(month) }, (_, i) => i + 1);

  const handleMonthChange = useCallback(
    (nextMonth: number) => {
      setMonth(nextMonth);
      const maxDay = getDaysInMonth(nextMonth);
      if (day > maxDay) setDay(maxDay);
    },
    [day]
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const key = createDateKey(month, day);
      setResult(entryMap.get(key) ?? null);
      setSubmitted(true);
      setShowInfo(true);
    },
    [day, entryMap, month]
  );

  const handleReset = useCallback(() => {
    setResult(null);
    setSubmitted(false);
    setShowInfo(true);
  }, []);

  if (!loading && !fetchError && submitted && result) {
    return (
      <FullscreenViewer
        result={result}
        month={month}
        day={day}
        showInfo={showInfo}
        onClose={handleReset}
        onToggleInfo={() => setShowInfo((prev) => !prev)}
        imageUrl={buildImageUrl(result.image)}
      />
    );
  }

  return (
    <MenuScreen
      loading={loading}
      fetchError={fetchError}
      month={month}
      day={day}
      availableDays={availableDays}
      onMonthChange={handleMonthChange}
      onDayChange={setDay}
      onSubmit={handleSubmit}
      showNoResult={submitted && !result}
    />
  );
}
