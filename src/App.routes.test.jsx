import { render, screen } from "@testing-library/react";
import App from "./App";

let mockCurrentPath = "/";

jest.mock(
  "react-router-dom",
  () => {
    const React = require("react");
    let routeParams = {};
    const normalizePath = (path) => path.split("?")[0].replace(/\/+$/, "") || "/";
    const matchRoute = (pathname, pattern) => {
      if (pattern === "*") {
        return { match: true, params: {} };
      }

      const pathParts = normalizePath(pathname).split("/");
      const patternParts = normalizePath(pattern).split("/");

      if (pathParts.length !== patternParts.length) {
        return { match: false, params: {} };
      }

      const params = {};
      for (let i = 0; i < patternParts.length; i += 1) {
        const patternPart = patternParts[i];
        const pathPart = pathParts[i];

        if (patternPart.startsWith(":")) {
          params[patternPart.slice(1)] = pathPart;
          continue;
        }

        if (patternPart !== pathPart) {
          return { match: false, params: {} };
        }
      }

      return { match: true, params };
    };

    const MemoryRouter = ({ initialEntries = ["/"], children }) => {
      mockCurrentPath = initialEntries[0] || "/";
      return React.createElement(React.Fragment, null, children);
    };

    const useLocation = () => ({ pathname: mockCurrentPath });
    const useParams = () => routeParams;
    const Link = ({ to, children, ...props }) =>
      React.createElement("a", { href: to, ...props }, children);

    const Route = ({ path, element }) => ({ path, element });

    const Routes = ({ children, location }) => {
      const pathname = location?.pathname || mockCurrentPath;
      const routes = React.Children.toArray(children).map((child) => child.props);
      const fallbackRoute = routes.find((route) => route.path === "*");
      const matchedRoute = routes.find((route) => route.path !== "*" && matchRoute(pathname, route.path).match);
      const selectedRoute = matchedRoute || fallbackRoute;

      if (!selectedRoute) {
        return null;
      }

      const { params } = matchRoute(pathname, selectedRoute.path);
      routeParams = params;
      return selectedRoute.element;
    };

    return {
      MemoryRouter,
      Routes,
      Route,
      Link,
      useLocation,
      useParams,
    };
  },
  { virtual: true }
);

beforeAll(() => {
  Object.defineProperty(window, "scrollTo", {
    value: jest.fn(),
    writable: true,
  });

  class IntersectionObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  Object.defineProperty(window, "IntersectionObserver", {
    value: IntersectionObserverMock,
    writable: true,
  });

  Object.defineProperty(window, "matchMedia", {
    value: (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
    writable: true,
  });
});

const renderRoute = (path) => {
  const { MemoryRouter } = require("react-router-dom");
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
};

test("renders home page", async () => {
  renderRoute("/");
  expect((await screen.findAllByText(/mohammed/i)).length).toBeGreaterThan(0);
});

test("renders interests page", async () => {
  renderRoute("/interests");
  expect(await screen.findByText(/things i'm/i)).toBeTruthy();
});

test("renders gallery page", async () => {
  renderRoute("/gallery");
  expect(await screen.findByText(/archives/i)).toBeTruthy();
});

test("renders contact page", async () => {
  renderRoute("/contact");
  expect(await screen.findByText(/say hi/i)).toBeTruthy();
});

test("removed routes fall back to home", async () => {
  renderRoute("/work");
  expect((await screen.findAllByText(/mohammed/i)).length).toBeGreaterThan(0);
});
