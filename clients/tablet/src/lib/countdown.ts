/**
 * Formats a remaining time as minutes and seconds (`37:59`), the way the gate room shows the
 * wormhole's countdown. Negative and fractional inputs are clamped and rounded up, so the
 * display never reads `0:00` while time is still left.
 */
export function formatCountdown(secondsRemaining: number): string {
    const total = Math.max(0, Math.ceil(secondsRemaining));
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
