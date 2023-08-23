import { HStack } from "@chakra-ui/react";
import type { DataTableProps } from "@saas-ui/react";
import { DataTable, PersonaAvatar } from "@saas-ui/react";
import { createColumnHelper } from "@tanstack/react-table";

import type { MevValidatorInfo, MevValidatorInfoWithKeep, TopMevValidatorInfo } from "@/types/api";
import { formatUsd } from "@/utils/intl";

///////////////////////////////////////////////////////////////////////////////

/**
 * Modified {@link DataTableProps} which overrides `data` and `columns` props
 * since both are overridden in {@link MevValidatorsTable}.
 */
type MevValidatorsTableProps = Omit<DataTableProps<MevValidatorInfoWithKeep>, "data" | "columns"> & {
  data: Maybe<MevValidatorInfo[]>;
};

/**
 * Displays the validators for a particular chain and their MEV stats.
 *
 * @see {@link MevValidatorInfo}
 * @see {@link MevValidatorInfoWithKeep}
 * @see {@link TopMevValidatorsTable}
 */
export const MevValidatorsTable = ({ data = [], ...props }: MevValidatorsTableProps) => {
  /**
   * Transform the data to include the `TotalMEVKept` and `KeepPercentage` fields.
   */
  const transformed = data.map((d) => {
    const TotalMEVKept = d.TotalMEVRevenue - d.TotalMEVShared;
    const KeepPercentage = `${((TotalMEVKept / d.TotalMEVRevenue) * 100).toFixed(2)}%`;
    return {
      ...d,
      TotalMEVKept,
      KeepPercentage,
    };
  });

  const h = createColumnHelper<(typeof transformed)[number]>();

  const columns = [
    h.display({
      header: "#",
      cell: ({ row }) => row.index + 1,
      size: 8,
    }),
    h.accessor("Name", {
      header: "Validator",
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <HStack>
            <PersonaAvatar name={value} size="xs" />
            <span>{value}</span>
          </HStack>
        );
      },
    }),
    h.display({
      header: "Skip",
      cell: "Yes",
      size: 8,
    }),
    h.accessor("TotalMEVRevenue", {
      header: "MEV Rev. Total",
      cell: ({ getValue }) => formatUsd(getValue()),
      meta: {
        isNumeric: true,
      },
    }),
    h.accessor("TotalMEVShared", {
      header: "MEV Rev. Shared",
      cell: ({ getValue }) => formatUsd(getValue()),
      meta: {
        isNumeric: true,
      },
    }),
    h.accessor("TotalMEVKept", {
      header: "MEV Rev. Kept",
      cell: ({ getValue }) => formatUsd(getValue()),
      meta: {
        isNumeric: true,
      },
    }),
    // per the handbook, this column is intentionally left blank
    h.display({
      header: "Wallets",
      cell: "-",
      size: 16,
    }),
    h.accessor("KeepPercentage", {
      header: "Keep %",
      meta: {
        isNumeric: true,
      },
    }),
  ];

  return <DataTable columns={columns} data={transformed} {...props} />;
};

///////////////////////////////////////////////////////////////////////////////

/**
 * Modified {@link DataTableProps} which overrides `data` and `columns` props
 * since both are overridden in {@link TopMevValidatorsTable}.
 */
type TopMevValidatorsTableProps = Omit<DataTableProps<TopMevValidatorInfo>, "data" | "columns"> & {
  data: Maybe<TopMevValidatorInfo[]>;
};

/**
 * Displays top validators and their MEV stats.
 *
 * @see {@link TopMevValidatorInfo}
 * @see {@link MevValidatorsTable}
 */
export const TopMevValidatorsTable = ({ data = [], ...props }: TopMevValidatorsTableProps) => {
  const h = createColumnHelper<TopMevValidatorInfo>();

  const columns = [
    h.accessor("Name", {
      header: "Name",
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <HStack>
            <PersonaAvatar name={value} size="xs" />
            <span>{value}</span>
          </HStack>
        );
      },
    }),
    h.accessor("NumberOfChainsValidating", {
      header: "# chains validating",
      cell: ({ getValue }) => `${getValue()} chains`,
    }),
    h.accessor("TotalMEVRevenue", {
      header: "Total MEV Revenue",
      cell: ({ getValue }) => formatUsd(getValue()),
      meta: {
        isNumeric: true,
      },
    }),
    h.accessor("TotalMEVShared", {
      header: "Total MEV Shared",
      cell: ({ getValue }) => formatUsd(getValue()),
      meta: {
        isNumeric: true,
      },
    }),
  ];

  return <DataTable columns={columns} data={data} {...props} />;
};
