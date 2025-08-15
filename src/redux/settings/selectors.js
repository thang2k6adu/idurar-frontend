import { createSelector } from 'reselect'

export const selectSetting = (state) => state.settings

export const selectCurrentSettings = createSelector(
  [selectSetting],
  (settings) => settings.result
)

export const selectMoneyFormat = createSelector(
  [selectCurrentSettings],
  (settings) => settings.money_format_settings
)

export const selectAppSettings = createSelector(
  [selectCurrentSettings],
  (settings) => settings.app_settings
)

export const selectFinanceSettings = createSelector(
  [selectCurrentSettings],
  (settings) => settings.finance_setting
)

export const selectCrmSettings = createSelector(
  [selectCurrentSettings],
  (settings) => settings.crm_setting
)

export const selectCompanySettings = createSelector(
  [selectCurrentSettings],
  (settings) => settings.company_setting
)