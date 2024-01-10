import { Suspense, lazy } from "react";
import { InspectorPageProps } from "./inspector.types";
import { Route, Routes } from "react-router-dom";
import { InspectorKeys } from "../../routing/envs/inspector.keys";
import { NestedRoute } from "./NestedRoute/NestedRoute";
import { Irpf } from "./Irpf";
import { IrpfDetails } from "./IrpfDetails";

const PropertySeasonList = lazy(
  () => import("./property-seasons/PropertySeasonList"),
);

const PropertySeasonImport = lazy(
  () => import("./property-seasons/PropertySeasonImport"),
);

export const InspectorRoutes = (params: InspectorPageProps) => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route
          path={InspectorKeys.PropertySeasons}
          element={<PropertySeasonList {...params} />}
        />

        <Route
          path={InspectorKeys.PropertySeasonsImport}
          element={<PropertySeasonImport {...params} />}
        />

        <Route
          path={InspectorKeys.PropertySeasonSubRoute}
          element={<NestedRoute />}
        />

        <Route path={InspectorKeys.Irpf} element={<Irpf />} />

        <Route
          path={InspectorKeys.IrpfStatementDetail}
          element={<IrpfDetails />}
        />
      </Routes>
    </Suspense>
  );
};
