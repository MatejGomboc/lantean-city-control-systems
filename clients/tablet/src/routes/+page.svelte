<main>
    <h1>Lantean City Control Systems</h1>
    <p class="subtitle">Reverse-Engineered</p>

    <section class="earth" aria-label="Gateway">
        <span class="label">Gateway</span>
        <span class="value">No link to a city</span>
    </section>
</main>

<style>
    main {
        display: grid;
        place-content: center;
        gap: 1rem;
        min-height: 100vh;
        padding: 0 16px;
        text-align: center;
    }

    h1 {
        margin: 0;
        font-weight: 300;
        letter-spacing: 0.08em;
        color: var(--ancient-teal);
        text-shadow: var(--glow);
    }

    .subtitle {
        margin: 0;
        color: var(--text-dim);
        letter-spacing: 0.3em;
        text-transform: uppercase;
        font-size: 0.8rem;
    }

    .earth {
        display: flex;
        justify-content: space-between;
        gap: 2rem;
        margin-top: 2rem;
        padding: 0.75rem 1rem;
        background: var(--earth-panel);
        border: 1px solid var(--earth-line);
        font-family: ui-monospace, monospace;
    }

    .label {
        color: var(--earth-line);
    }
</style>
