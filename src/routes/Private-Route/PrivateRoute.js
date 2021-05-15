import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  // let token = Cookies.get("token");
  // console.log(token);
  // return (
  //   <Route
  //     {...rest}
  //     render={(props) =>
  //       token ? (
  //         <Component {...props} />
  //       ) : (
  //         <Redirect
  //           to={{
  //             pathname: "/",
  //             state: { from: props.location },
  //           }}
  //         />
  //       )
  //     }
  //   />
  // );
  // return (
  //   <Route
  //     {...rest}
  //     render={(props) =>
  //       Cookies.get("token") ? (
  //         <Component {...props} />
  //       ) : (
  //         <Redirect to="/signin" />
  //       )
  //     }
  //   />
  // );
  let token = Cookies.get("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

// let token = Cookies.get("token");
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         token ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/",
//               state: { from: props.location },
//             }}
//           />
//         )
//       }
//     />
//   );
