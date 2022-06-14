import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import ArchaeologistTableRow from './ArchaeologistTableRow';
import { Archaeologist } from '../../../stores/Archaeologist/archaeologist.interfaces'
import { SelectArchaeologistProps } from '../../../types/sarcophagusCreate'
import { BigNumber } from "@ethersproject/bignumber";
import { ChangeEvent } from 'react';

describe('ArchaeologistTableRow', () => {
  let archaeologist: Archaeologist = {
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
  };
  let file = new File(['a', 'b'], 'test');
  let props: SelectArchaeologistProps = {
    archSelected: '',
    errors: {},
    file: file,
    touched: {},
    values: {
      address: 'string',
      bounty: 123,
      custom: false,
      customTime: '',
      daysDisplayed: 123,
      diggingFee: 10,
      fileUploaded: true,
      name: 'doodlebob',
      recipientPublicKey: '0xabc123',
      resurrectionTime: 12345,
      timeSelect: null
    },
    handleChange: function (event: ChangeEvent<HTMLInputElement>): void {
      throw new Error('Function not implemented.');
    },
    handleSelected: function (selectedArchaeologist: Archaeologist, storageFee: string | number | BigNumber): void {
      throw new Error('Function not implemented.');
    },
    setFieldValue: function (field: string, value: any, shouldValidate?: boolean): void {
      throw new Error('Function not implemented.');
    }
  };

  beforeEach(() => {
    archaeologist.isOnline = false;
    archaeologist.freeBond = BigNumber.from(1)
  })

  test('hides a row if arch is offline', () => {
    archaeologist.freeBond = BigNumber.from(1000)
    render(<ArchaeologistTableRow archaeologist={archaeologist} {...props} />);
    const linkElement = screen.queryByText(/0x8bFE1b9...2023CC/i);
    expect(linkElement).toBeNull();
  });

  test('hides a row if free bond is less than bounty and storage costs', () => {
    archaeologist.isOnline = true
    render(<ArchaeologistTableRow archaeologist={archaeologist} {...props} />);
    const linkElement = screen.queryByText(/0x8bFE1b9...2023CC/i);
    expect(linkElement).toBeNull();
  });

  test('renders a row if arch is online and has enough free bond posted', () => {
    archaeologist.freeBond = BigNumber.from(1000)
    archaeologist.isOnline = true
    render(<ArchaeologistTableRow archaeologist={archaeologist} {...props} />);
    const linkElement = screen.getByText(/0x8bFE1b9...2023CC/i);
    expect(linkElement).toBeInTheDocument();
  });
})