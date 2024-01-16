import { Suspense, lazy } from "react";
import { InspectorPageProps, InspectorViewMode } from "./inspector.types";
import { Route, Routes } from "react-router-dom";
import { InspectorKeys } from "../../routing/envs/inspector.keys";
import { NestedRoute } from "./NestedRoute/NestedRoute";
import { Irpf } from "./Irpf";
import { IrpfDetails } from "./IrpfDetails";
import { Loading } from "../../components/Loading";
import { useAppNavigation } from "../../routing/useAppNavigation";
import { InspRoutesCtxProvider } from "../utils/InspRoutesCtxProvider";
import { ContactOnlyRoute } from "../utils/ContactOnlyRoute";

const PropertySeasonList = lazy(
  () => import("./property-seasons/PropertySeasonList"),
);

const PropertySeasonImport = lazy(
  () => import("./property-seasons/PropertySeasonImport"),
);

export const InspectorRoutes = ({
  isLoadingCustomerInfo,
  viewMode,
  ...params
}: InspectorPageProps & {
  isLoadingCustomerInfo: boolean;
  viewMode: InspectorViewMode;
}) => {
  const { handleSameEnvNav } = useAppNavigation();

  const waitingForMonoContactProps =
    viewMode === InspectorViewMode.CustomerMonoContact &&
    (!params.contactId || !params.personProfileId);

  if (isLoadingCustomerInfo || waitingForMonoContactProps) {
    return (
      <div className="w-full h-full items-center justify-center flex flex-col">
        <Loading color="black" />
      </div>
    );
  }

  const handleRedirectToFallback = () => {
    handleSameEnvNav({ key: InspectorKeys.Summary });
  };

  return (
    <InspRoutesCtxProvider
      onRedirectToFallback={handleRedirectToFallback}
      viewMode={viewMode}
    >
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path={InspectorKeys.Summary} element={<>summary</>} />

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

          <Route
            path={InspectorKeys.IrpfStatementDetail}
            element={<IrpfDetails />}
          />

          <Route
            path={InspectorKeys.CPR}
            element={
              <ContactOnlyRoute>
                <>cpr</>
              </ContactOnlyRoute>
            }
          />
        </Routes>
      </Suspense>
    </InspRoutesCtxProvider>
  );
};
