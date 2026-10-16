import { describe, it, expect } from 'vitest';
import { formatCountdown } from './countdown';

describe('formatCountdown', () => {
    it('shows the full 38 minutes', () => {
        expect(formatCountdown(38 * 60)).toBe('38:00');
    });

    it('pads seconds to two digits', () => {
        expect(formatCountdown(65)).toBe('1:05');
    });

    it('rounds a fraction up, so it never shows zero too early', () => {
        expect(formatCountdown(0.2)).toBe('0:01');
    });

    it('clamps negative time to zero', () => {
        expect(formatCountdown(-3)).toBe('0:00');
    });
});
