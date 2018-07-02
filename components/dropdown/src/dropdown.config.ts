import { Injectable } from '@angular/core';

@Injectable()
export class DropdownConfig {
  /** specifies event that should trigger */
  trigger = 'click';

  /** placement of pop menu */
  placement = 'bottom-left';

  /** whether the dropdown menu is disabled */
  disabled = false;

  /** whether the dropdown menu is currently being shown */
  open = false;

  /** whether the dropdown menu will be closed after pressing ESC */
  closeOnEsc = true;

  /** whether the dropdown menu will be closed on item or document click */
  closeOnClick = true;
}
