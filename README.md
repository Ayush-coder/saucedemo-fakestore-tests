# Comprehensive Core Engineering Automation Test Framework Suite

## 🛠️ Choice of Framework & Rationale
*   **UI Suite (SauceDemo): Playwright (JavaScript native binding)**.
    *   *Rationale:* Selected over traditional Selenium due to auto-wait stability mechanisms, native headless processing speed, out-of-the-box isolation contexts via BrowserContexts, and tracing toolchains that remove flaky runtime overheads.
*   **API Suite (FakeStoreAPI): Jest + Supertest Library**.
    *   *Rationale:* Provides a fluent abstraction layer for standard programmatic HTTP operations. Native snapshot engines seamlessly implement contract verification mechanisms without adding complex payload validator extensions.

## 🚀 Architectural Scaling & Execution Acceleration Plan
*   **Parallel Multi-Thread Execution Strategy:**
    *   *UI Layer:* Handled directly by Playwright configurations (`workers: process.env.CI ? 4 : undefined`). Isolates processing nodes into unique processes to prevent shared state failures.
    *   *API Layer:* Configured via the isolated execution mode (`jest --runInBand=false`), scaling parallel execution to utilize full system capability across all CPU endpoints.
*   **Enterprise Security and Configuration Layer:**
    *   All functional environment testing credentials have been isolated from source code into a secure `.env` runtime context file utilizing native environment variable injection. This prevents sensitive exposure in repository histories.
*   **Enterprise Test Engineering Reporting Engine:**
    *   Configured with third-party reporting via `allure-playwright` and HTML-based summary pipelines.
    *   Saves runtime failures, screen captures, raw network request streams, and exception stack logs directly into an external `playwright-report/` directory for historical analysis.

## ⚡ Setup & Execution Instructions

### 1. Initialize Environment Variables
Create a `.env` file in the root directory and populate it with the required service test accounts:
```ini
# SauceDemo UI Test Credentials
SAUCEDEMO_USER=standard_user
SAUCEDEMO_LOCKED_USER=locked_out_user
SAUCEDEMO_PASSWORD=secret_sauce

# FakeStoreAPI Test Credentials
FAKESTORE_USER=mor_2314
FAKESTORE_PASSWORD=83r5^_`
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Trigger Test Automation Framework Executions
*   **Execute API Framework Suite (Jest):**
    ```bash
    npm test
    ```
*   **Execute UI Framework Suite (Playwright):**
    ```bash
    npm run test:ui
    ```

## ⚡ Multi-Stage Automated Execution Pipelines
*   Automated CI execution triggers testing scripts natively inside dedicated Ubuntu VMs whenever new code is merged or pushed.
*   The system retains run histories for 30 days to facilitate continuous build diagnostics and system verification.
