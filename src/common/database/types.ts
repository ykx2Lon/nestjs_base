
import {
  ColumnType,
  Generated,
  Insertable,
  JSONColumnType,
  Selectable,
  Updateable,
} from 'kysely'

export interface ContractTable 
 {
    /**
     * snowflake id
     */
    contract_id: Buffer;
    /**
     * 建立時間
     */
    create_time: Date;
    /**
     * 建立人員
     */
    creator_user_id: string;
    /**
     * 每度電費
     */
    electricity_bill: number | null;
    /**
     * 契約終止日
     */
    end_date: Date | null;
    /**
     * 收費週期，以cron字串表示
     */
    payment_cycle_cron: string | null;
    /**
     * 每月租金
     */
    rental: number | null;
    /**
     * 總押金，單位為NTD
     */
    security_deposit: number | null;
    /**
     * 契約生效日
     */
    start_date: Date | null;
    /**
     * FK，租客id
     */
    tenant_id: Buffer;
    /**
     * FK，單位id
     */
    unit_id: Buffer;
    /**
     * 每期水費，-1為照錶收費
     */
    water_bill: number | null;
  }
  
  export interface DwellingGroupTable
 {
    /**
     * 完整地址，包含縣市鄉鎮/樓層，中文儲存
     */
    address: string | null;
    /**
     * 所在縣/市，中文儲存
     */
    city: string | null;
    /**
     * 建立時間
     */
    create_time: Date;
    /**
     * 建立人員
     */
    creator_user_id: string;
    /**
     * 所在鄉/鎮/區，中文儲存
     */
    district: string | null;
    /**
     * snowflake id
     */
    group_id: Buffer;
    /**
     * 上次更新人員
     */
    last_editor: string | null;
    /**
     * 上次更新時間
     */
    last_update: Date | null;
    /**
     * 介面顯示順序
     */
    sort: number | null;
  }
  
  export interface DwellingUnitTable
 {
    /**
     * 完整地址，包含樓層/單位編號
     */
    address: string | null;
    /**
     * 建立時間
     */
    create_time: Date;
    /**
     * 建立人員
     */
    creator_user_id: string;
    /**
     * 每度電費
     */
    electricity_bill: number | null;
    /**
     * FK dwelling_group id
     */
    group_id: Buffer | null;
    /**
     * 上次更新人員
     */
    last_editor: string | null;
    /**
     * 上次更新時間
     */
    last_update: Date | null;
    /**
     * 目前設定租金
     */
    rental: number | null;
    /**
     * 收取押金n個月，可設定小數
     */
    security_deposit_month: number | null;
    /**
     * 介面顯示順序
     */
    sort: number | null;
    /**
     * 狀態:unactive/available/rented
     */
    status: string | null;
    /**
     * snowflake id
     */
    unit_id: Buffer;
    /**
     * 完整單位名稱
     */
    unit_name: string | null;
    /**
     * 每期水費，-1為照錶收費
     */
    water_bill: number | null;
  }
  
  export interface ExtraCostTable
 {
    /**
     * 金額
     */
    cost: number;
    /**
     * 名目
     */
    denomontation: string;
    /**
     * 對應繳費紀錄
     */
    payment_record_id: string;
    /**
     * 表單內排序
     */
    sort: number;
  }
  
  export interface PaymentRecordTable
 {
    /**
     * 對應租約id
     */
    contract_id: Buffer;
    /**
     * 總電費
     */
    electricity_degree: number | null;
    /**
     * 本期結束時間
     */
    end_date: Date;
    /**
     * 租約產生日期
     */
    generate_date: Date;
    /**
     * 總入帳金額
     */
    inward_amount: number | null;
    /**
     * 入帳時間，未入帳為null
     */
    paid_time: Date | null;
    /**
     * contract_id-產生年月
     */
    payment_record_id: string;
    /**
     * 本期開始時間
     */
    start_date: Date;
    /**
     * 總共需收取金額，含額外費用(extra_cost)
     */
    total_amount_due: number | null;
    /**
     * 總水費
     */
    water_degree: number | null;
  }
  
  export interface TenantTable
 {
    /**
     * 連絡電話
     */
    phone: string | null;
    /**
     * 狀態:rent_out/renting/ready(已簽約尚未入住)
     */
    status: string | null;
    /**
     * snowflake id
     */
    tenant_id: Buffer;
    /**
     * 租客名稱
     */
    tenant_name: string | null;
    /**
     * FK，dwelling_unit id
     */
    unit_id: Buffer;
  }
  
  export interface TenantBankTable
 {
    /**
     * 租客銀行帳號
     */
    tenant_bank_account: string;
    /**
     * 租客銀行代號
     */
    tenant_bank_code: string;
    /**
     * 租客id
     */
    tenant_id: Buffer;
  }
  
  export interface UnitEditAuthTable
 {
    /**
     * 權限:operate/edit，每個權限向下兼容
     */
    auth_type: string;
    /**
     * FK dwelling_unit id
     */
    unit_id: Buffer;
    /**
     * FK user id
     */
    user_id: string;
  }
  
  export interface UserTable
 {
    email: string;
    password_hash: string;
    user_id: string;
    user_name: string;
    status: string;
  }
  
  export interface DB
 {
    contract: ContractTable;
    dwelling_group: DwellingGroupTable;
    dwelling_unit: DwellingUnitTable;
    extra_cost: ExtraCostTable;
    payment_record: PaymentRecordTable;
    tenant: TenantTable;
    tenant_bank: TenantBankTable;
    unit_edit_auth: UnitEditAuthTable;
    user: UserTable;
  }
  
  export type ContractEntity = Selectable<ContractTable>
  export type NewContract = Insertable<ContractTable>
  export type ContractUpdate = Updateable<ContractTable>

  export type DwellingGroupEntity = Selectable<DwellingGroupTable>
  export type NewDwellingGroup = Insertable<DwellingGroupTable>
  export type DwellingGroupUpdate = Updateable<DwellingGroupTable>
  
  export type DwellingUnitEntity = Selectable<DwellingUnitTable>
  export type NewDwellingUnit = Insertable<DwellingUnitTable>
  export type DwellingUnitUpdate = Updateable<DwellingUnitTable>
  
  export type ExtraCostEntity = Selectable<ExtraCostTable>
  export type NewExtraCost = Insertable<ExtraCostTable>
  export type ExtraCostUpdate = Updateable<ExtraCostTable>
  
  export type PaymentRecordEntity = Selectable<PaymentRecordTable>
  export type NewPaymentRecord = Insertable<PaymentRecordTable>
  export type PaymentRecordUpdate = Updateable<PaymentRecordTable>
  
  export type TenantEntity = Selectable<TenantTable>
  export type NewTenant = Insertable<TenantTable>
  export type TenantUpdate = Updateable<TenantTable>
  
  export type TenantBankEntity = Selectable<TenantBankTable>
  export type NewTenantBank = Insertable<TenantBankTable>
  export type TenantBankUpdate = Updateable<TenantBankTable>
  
  export type UnitEditAuthEntity = Selectable<UnitEditAuthTable>
  export type NewUnitEditAuth = Insertable<UnitEditAuthTable>
  export type UnitEditAuthUpdate = Updateable<UnitEditAuthTable>
  
  export type UserEntity = Selectable<UserTable>
  export type NewUser = Insertable<UserTable>
  export type UserUpdate = Updateable<UserTable>