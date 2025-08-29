import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Button } from "@/components/ui/button"

import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Button variant="outline">Button</Button>
  </StrictMode>,
)
