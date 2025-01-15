import { createAuthToken, createCheck, getCheck } from "./auth.service";
import { complycube } from "../shared/complyCube";

jest.mock("../shared/complyCube", () => ({
  complycube: {
    client: {
      create: jest.fn(),
    },
    token: {
      generate: jest.fn(),
    },
    check: {
      create: jest.fn(),
      get: jest.fn(),
    },
  },
}));

describe("Auth Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createAuthToken", () => {
    it("should create a client and generate a token successfully", async () => {
      const mockInput = {
        email: "test@example.com",
        personDetails: {
          firstName: "test",
          lastName: "li",
          dob: '2000-00-00'
        }
      };
      const mockClient = { id: "client123" };
      const mockToken = { token: "mock-token" };

      (complycube.client.create as jest.Mock).mockResolvedValue(mockClient);
      (complycube.token.generate as jest.Mock).mockResolvedValue(mockToken);

      const result = await createAuthToken(mockInput);

      expect(complycube.client.create).toHaveBeenCalledWith({
        type: "person",
        ...mockInput,
      });
      expect(complycube.token.generate).toHaveBeenCalledWith("client123", {
        referrer: "*://*/*",
      });
      expect(result).toEqual({ token: mockToken, clientId: "client123" });
    });

    it("should throw an error if client creation fails", async () => {
      const mockInput = {
        email: "test@example.com",
        personDetails: {
          firstName: "test",
          lastName: "li",
          dob: '2000-00-00'
        }
      };
      (complycube.client.create as jest.Mock).mockRejectedValue(
        new Error("Client creation failed")
      );

      await expect(createAuthToken(mockInput)).rejects.toThrow(
        "Client creation failed"
      );
      expect(complycube.token.generate).not.toHaveBeenCalled();
    });
  });

  describe("createCheck", () => {
    it("should create a check successfully", async () => {
      const mockInput = {
        clientId: "client123",
        type: "document_check",
        documentId: "doc123",
      };
      const mockCheck = { id: "check123" };

      (complycube.check.create as jest.Mock).mockResolvedValue(mockCheck);

      const result = await createCheck(mockInput);

      expect(complycube.check.create).toHaveBeenCalledWith("client123", {
        type: "document_check",
        documentId: "doc123",
      });
      expect(result).toEqual(mockCheck);
    });

    it("should throw an error if check creation fails", async () => {
      const mockInput = {
        clientId: "client123",
        type: "document_check",
        documentId: "doc123",
      };
      (complycube.check.create as jest.Mock).mockRejectedValue(
        new Error("Check creation failed")
      );

      await expect(createCheck(mockInput)).rejects.toThrow(
        "Check creation failed"
      );
    });
  });

  describe("getCheck", () => {
    it("should return check details successfully", async () => {
      const mockCheckId = "check123";
      const mockCheckResult = { id: "check123", status: "complete" };

      (complycube.check.get as jest.Mock).mockResolvedValue(mockCheckResult);

      const result = await getCheck(mockCheckId);

      expect(complycube.check.get).toHaveBeenCalledWith(mockCheckId);
      expect(result).toEqual(mockCheckResult);
    });

    it("should throw an error if check retrieval fails", async () => {
      const mockCheckId = "check123";
      (complycube.check.get as jest.Mock).mockRejectedValue(
        new Error("Check retrieval failed")
      );

      await expect(getCheck(mockCheckId)).rejects.toThrow(
        "Check retrieval failed"
      );
    });
  });
});
