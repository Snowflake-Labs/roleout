import Mustache from 'mustache'

export interface NamingConvention {
  database: string
  schema: string
  functionalRole: string
  virtualWarehouse: string
  databaseAccessRole: string
  schemaAccessRole: string
  schemaObjectGroupAccessRole: string
  virtualWarehouseAccessRole: string
  environmentManagerRole: string
  terraformGrantResourceName: string
  terraformGrantVirtualWarehouseResourceName: string
  terraformGrantRoleResourceName: string
  terraformRoleOwnershipGrantResourceName: string
}

export const defaultNamingConvention: NamingConvention = {
  database: '{{env}}_{{name}}_DB',
  schema: '{{name}}',
  functionalRole: '{{env}}_{{name}}_FR',
  virtualWarehouse: '{{env}}_{{name}}_WH',
  databaseAccessRole: '{{database}}_{{levelShort}}_AR',
  schemaAccessRole: '{{database}}_{{schema}}_{{levelShort}}_AR',
  schemaObjectGroupAccessRole: '{{identifier}}_{{levelShort}}_AR',
  virtualWarehouseAccessRole: '{{name}}_{{levelShort}}_AR',
  environmentManagerRole: '{{env}}_SYSADMIN',
  terraformGrantResourceName:
    'grant_{{privilegeLower}}_on_{{#future}}future_{{/future}}{{databaseLower}}_{{#schema}}_{{schemaLower}}_{{/schema}}{{kindLower}}{{#objectName}}_{{objectName}}{{/objectName}}',
  terraformGrantVirtualWarehouseResourceName:
    'grant_{{privilegeLower}}_on_warehouse_{{virtualWarehouseLower}}',
  terraformGrantRoleResourceName: 'role_{{roleLower}}_grants',
  terraformRoleOwnershipGrantResourceName: 'role_{{roleLower}}_ownership_grant',
}

export const renderName = (template: keyof NamingConvention, namingConvention: NamingConvention, view: any) => {
  return Mustache.render(namingConvention[template], view)
}