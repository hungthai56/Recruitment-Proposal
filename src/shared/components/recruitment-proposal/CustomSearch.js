
import FormInput from 'shared/components/common/custom-form/FormInput'
import React, { forwardRef, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Constants from '../../../utils/Constants';
import { useHistory } from 'react-router';
import useQuery from '../../../hooks/use-query';
import Validator from '../../../utils/Validator';
import FormDatePicker from '../common/custom-form/FormDatePicker';
import CustomFormProvider from '../common/custom-form/CustomFormProvider'
import FormActionSearch from '../common/form/form-search/FormActionSearch'
import FormItem from '../common/form/FormItem'
import FormSelect from 'shared/components/common/custom-form/FormSelect';
import FormGroupSearch from '../common/form/form-search/FormGroupSearch'
import FormGroupSearchRow from '../common/form/form-search/FormGroupSearchRow'
import IconSearch from 'assets/images/icons/icon-search'
import ButtonCommon from '../common/button/ButtonCommon'
import ButtonSearch from '../common/button/ButtonSearch'
import useRouterV2 from 'hooks/use-router-v2'
import { convertParamsToArray } from 'utils/Utils'
import Permission from 'utils/Permission';
export default function CustomSearch(props) {
  const {
    NameTable, Positions, Status, WorkType
  } = props;

  let PositionsCustom = []
  const resultPositions = Object.values(Positions);
  for (let i = 0; i < resultPositions.length; i++) {
    let valuerPositions = { value: i, label: resultPositions[i] };
    PositionsCustom.push(valuerPositions)
  }
  
  let workTypeCustom = []
  const result = Object.values(WorkType);
  for (let i = 0; i < result.length; i++) {
    let valuer = { value: i, label: result[i] };
    workTypeCustom.push(valuer)
  }

  let StatusCustom = []
  const resultStatus = Object.values(Status);
  for (let i = 0; i < resultStatus.length; i++) {
    let valuer = { value: i, label: resultStatus[i] };
    StatusCustom.push(valuer)
  }

  let defaultValues = { Search: '', Status: null, Position: null, ShowIn: null, WorkType: null, DateTo: null }
  const methods = useForm({
    defaultValues: defaultValues,
});
  const {
    reset,
  } = methods;
  const query = useQuery()
  const router = useRouterV2();
  const [open, setOpen] = useState(false);

  const onSubmit = (data) => {
    let paramsNew = {
      [`${Constants.QueryParam.Status.VALUE}`]: data?.Status,
      [`${Constants.QueryParam.Positions.VALUE}`]:
        data?.Positions,
      [`${Constants.QueryParam.WorkType.VALUE}`]:
        data?.WorkType,
      [`${Constants.QueryParam.DateTo.VALUE}`]:
        data?.DateTo,
      [Constants.QueryParam.Page.VALUE]:
        Constants.PRODUCT_LIST_PAGINATION.OFFSET,
      [Constants.QueryParam.Limit.VALUE]:
        Constants.PRODUCT_LIST_PAGINATION.LIMIT,
      [Constants.QueryParam.Search.VALUE]: data?.Search,
    };
    router.replace({
      params: paramsNew
    })
  };

  const handleResetButton = () => {
    reset(defaultValues);
    router.replace({
      params: {

      }
    })
  };

  useEffect(() => {
    if (router.get(Constants.QueryParam.Search.VALUE)) {
      methods.setValue('Search', query.get(Constants.QueryParam.Search.VALUE));
    } else {
      methods.setValue('Search', '')
    }
    if (router.get(Constants.QueryParam.Status.VALUE)) {
      methods.setValue('Status', query.get(Constants.QueryParam.Status.VALUE));
    } else {
      methods.setValue('Status', null)
    }
    if (router.get(Constants.QueryParam.Positions.VALUE)) {
      methods.setValue('Positions', query.get(Constants.QueryParam.Positions.VALUE));
    } else {
      methods.setValue('Positions', null)
    }
    if (router.get(Constants.QueryParam.WorkType.VALUE)) {
      methods.setValue('WorkType', query.get(Constants.QueryParam.WorkType.VALUE));
    } else {
      methods.setValue('WorkType', null)
    }
    if (router.get(Constants.QueryParam.DateTo.VALUE)) {
      methods.setValue('DateTo', query.get(Constants.QueryParam.DateTo.VALUE));
    } else {
      methods.setValue('DateTo', null)
    }
  }, [
    router.get(Constants.QueryParam.Search.VALUE),
    router.get(Constants.QueryParam.Status.VALUE),
    router.get(Constants.QueryParam.Positions.VALUE),
    router.get(Constants.QueryParam.WorkType.VALUE),
    router.get(Constants.QueryParam.DateTo.VALUE)
  ])

  React.useEffect(() => {
    let queryParams = router.getAll();
    delete queryParams[Constants.QueryParam.Page.VALUE];
    delete queryParams[Constants.QueryParam.Limit.VALUE];
    delete queryParams[Constants.QueryParam.Offset.VALUE];
    const paramsArray = convertParamsToArray(queryParams);
    if (paramsArray.length == 0) {
      const values = methods.getValues()
      methods.reset(values)
    }
  }, [methods.isSubmitted, methods.getValues, methods.reset, router.get(Constants.ROUTER_URL.TYPE), query])

  return (
    <div className="stock-container">
      <div>
        <CustomFormProvider {...methods} >
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormGroupSearchRow
              isShowFilter
              type={NameTable}
              isRequest={false}
              isShowFilterColumnTable
              componentLeft={
                <FormGroupSearch isWrap={false}>
                  <FormItem style={{ flex: 2 }}>
                    <FormInput
                      fieldName="Search"
                      validate={[]}
                      placeholder={"Tìm kiếm mã đề xuất, tên đề xuất..."}
                      icon={<IconSearch />}
                    />
                  </FormItem>
                  <FormItem style={{ flex: 1 }}>
                    <FormSelect
                      validate={[]}
                      options={PositionsCustom}
                      fieldName="Positions"
                      placeholder={'Vị trí đề xuất'}
                    />
                  </FormItem>
                  <FormItem style={{ flex: 1 }}>
                    <FormSelect
                      validate={[]}
                      options={StatusCustom}
                      fieldName="Status"
                      placeholder={'Trạng thái'}
                    />
                  </FormItem>
                </FormGroupSearch>
              }
              componentRight={
                <FormActionSearch>
                  <ButtonCommon
                    type="button"
                    onClick={() => {
                      handleResetButton();
                    }}
                    typeColor="border-green"
                    disabled={!methods?.formState?.isDirty ? true : false}
                  >
                    Thiết lập lại
                  </ButtonCommon>
                  {
                    <ButtonSearch
                      onClickSelect={() => setOpen(!open)}
                      type="submit"
                      typeColor="background-green"
                    >
                      Tìm kiếm
                    </ButtonSearch>
                  }
                </FormActionSearch>
              }
            />
            {
              open && <FormGroupSearchRow
                isShowFilter
                type={NameTable}
                isRequest={false}
                isShowFilterColumnTable
                componentLeft={
                  <FormGroupSearch isWrap={false}>
                    <FormItem style={{ flex: 1 }}>
                      <FormSelect
                        validate={[]}
                        options={workTypeCustom}
                        fieldName="WorkType"
                        placeholder={'Hình thức'}
                      />
                    </FormItem>
                    <FormItem style={{ flex: 1 }}>
                      <FormDatePicker
                        fieldName="DateTo"
                        validate={[Validator.CheckedDate(methods.getValues('DateTo'), 2)]}
                        placeholder="Hạn tuyển"
                      />
                    </FormItem>
                    <FormItem style={{ flex: 1 }}></FormItem>
                    <FormItem style={{ flex: 1 }}></FormItem>
                  </FormGroupSearch>
                }
              />
            }
          </form>
        </CustomFormProvider>
      </div>
    </div>
  )
}

