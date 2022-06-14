import '@testing-library/jest-dom'
import { render, screen, } from '@testing-library/react';
import { context, } from '../../../stores/Archaeologist';
import { Archaeologist, } from '../../../stores/Archaeologist/archaeologist.interfaces';
import { ResurrectionTimes, SarcophagusCreateValues, SelectArchaeologistProps } from '../../../types/sarcophagusCreate';
import ArchaeologistSelect from './index';
import { BigNumber } from 'ethers';

let archaeologistWithStats: Archaeologist = {
  exists: false,
  currentPublicKey: '',
  address: '0x8bFE1b9503176E6A804ab4E53dEF1733e32023CC',
  endpoint: '',
  paymentAddress: '',
  feePerByte: BigNumber.from(1),
  minimumBounty: BigNumber.from(1),
  minimumDiggingFee: BigNumber.from(1),
  maximumResurrectionTime: BigNumber.from(1),
  freeBond: BigNumber.from(1),
  cursedBond: BigNumber.from(1)
}

let values: SarcophagusCreateValues = {
  address: '',
  bounty: 100,
  custom: false,
  customTime: '',
  daysDisplayed: 7,
  diggingFee: 10,
  fileUploaded: true,
  name: 'krabby patty formula',
  recipientPublicKey: '0xAsbc123',
  resurrectionTime: 2200,
  timeSelect: ResurrectionTimes.Week
}

let props: SelectArchaeologistProps = {
  archSelected: '',
  errors: {},
  file: new File(['abc'], 'name'),
  touched: {},
  values,
  handleChange: () => { },
  handleSelected: () => { },
  setFieldValue: () => { }
};

beforeAll(() => {

})

test('should hide arch from both header count and list', async () => {
  let ArchaeologistsProviderCustom = context.Provider
  render(
    <ArchaeologistsProviderCustom value={{ archaeologistsWithStats: [archaeologistWithStats] }}>
      <ArchaeologistSelect {...props} />
    </ArchaeologistsProviderCustom>
  );

  const tableHeader = await screen.findByText('Archaeologists (0)')
  expect(tableHeader).toBeInTheDocument();
});

test('should show a count of 1 in header and not hide the arch', async () => {
  let ArchaeologistsProviderCustom = context.Provider
  archaeologistWithStats.freeBond = BigNumber.from(1000000)
  archaeologistWithStats.isOnline = true
  render(
    <ArchaeologistsProviderCustom value={{ archaeologistsWithStats: [archaeologistWithStats] }}>
      <ArchaeologistSelect {...props} />
    </ArchaeologistsProviderCustom>
  );

  const tableHeader = await screen.findByText('Archaeologists (1)')
  expect(tableHeader).toBeInTheDocument();

  const archAddress = await screen.findByText('0x8bFE1b9...2023CC')
  expect(archAddress).toBeInTheDocument();
});
