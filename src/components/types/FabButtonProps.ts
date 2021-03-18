import { CommonButtonProps } from './CommonButtonProps'
import { IonFab, IonFabButton } from "@ionic/react"

export type FabButtonProps = CommonButtonProps & {
    fab: React.ComponentProps<typeof IonFab>;
    button: React.ComponentProps<typeof IonFabButton>;
}