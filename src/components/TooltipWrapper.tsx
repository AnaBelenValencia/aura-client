import * as Tooltip from '@radix-ui/react-tooltip'

type Props = {
  label: string
  children: React.ReactNode
}

export function TooltipWrapper({ label, children }: Props) {
  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="right"
            className="bg-white text-gray-800 text-xs px-2 py-1 rounded shadow-lg"
            sideOffset={8}
          >
            {label}
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
