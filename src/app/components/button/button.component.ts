import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input({ required: true })
  public text: string = "";

  @Input({ transform: booleanAttribute })
  public secondary: boolean = false;

  @Input({ transform: (value: string) => `--color: ${ value };` })
  public color: string = "--color: #00f"
}
