# Sovereign Grid Dashboard

The **Sovereign Grid Dashboard** is the primary human-in-the-loop (HITL) interface for the Sovereign Grid governance framework. It provides real-time visualization of agentic status, health monitoring, and critical safety intervention controls.

## Overview
This dashboard acts as a gateway for human operators to observe and authorize high-intensity operations initiated by the Sovereign Grid backend. It ensures that no agent action exceeding predefined safety thresholds is executed without explicit human verification.

## Core Features
* **Operational Monitoring:** Real-time visibility into current system status.
* **Safety Guardrails:** Automatic detection and visualization of `PENDING_APPROVAL` states.
* **Human-in-the-Loop (HITL):** Direct interface to approve or deny critical system recalibrations.
* **State Transparency:** Continuous polling of the system grid-state for real-time updates.

## Technical Stack
* **Framework:** Next.js (React)
* **Styling:** Tailwind CSS / CSS Modules
* **Governance Integration:** Communicates with the Sovereign Grid Python API for state management.

## Deployment
This project is configured for automated deployment via Vercel. Every push to the `main` branch triggers an automatic build and production update.

## License
This project is licensed under the **MIT License**. See the `LICENSE` file for details.
// triggering redeploy
