import { expect } from "chai";
import { wildcardToRegExp, wildcardSearch } from "../index";

describe("ReDoS (Regular Expression Denial of Service) Security Tests", () => {
  describe("ReDoS Vulnerability Protection", () => {
    it("should handle patterns with many opening parentheses without timeout", () => {
      // This pattern would cause ReDoS in the original vulnerable regex
      const maliciousPattern = ":param(" + "(".repeat(100) + "test";
      
      const start = performance.now();
      const result = wildcardToRegExp(maliciousPattern);
      const end = performance.now();
      
      // Should complete quickly (under 100ms) due to fixed regex
      expect(end - start).to.be.below(100);
      expect(result).to.have.property("reg");
      expect(result).to.have.property("keys");
    });

    it("should handle patterns with excessive optional groups", () => {
      // Pattern that could cause alternation backtracking
      const maliciousPattern = "/.:param?".repeat(50) + "x";
      
      const start = performance.now();
      const result = wildcardToRegExp(maliciousPattern);
      const end = performance.now();
      
      // Should complete quickly without exponential backtracking
      expect(end - start).to.be.below(100);
      expect(result).to.have.property("reg");
    });

    it("should handle patterns with many dots before parameters", () => {
      // Pattern that exploits optional groups
      const maliciousPattern = "/" + ".".repeat(200) + ":test";
      
      const start = performance.now();
      const result = wildcardToRegExp(maliciousPattern);
      const end = performance.now();
      
      expect(end - start).to.be.below(100);
      expect(result).to.have.property("reg");
    });

    it("should handle complex nested patterns safely", () => {
      // Complex pattern that combines multiple potential ReDoS vectors
      const complexPattern = "/api/:version(" + "(".repeat(10) + "v[0-9]+)" + ")".repeat(10) + "?/users/:id";
      
      const start = performance.now();
      const result = wildcardToRegExp(complexPattern);
      const end = performance.now();
      
      expect(end - start).to.be.below(100);
      expect(result).to.have.property("reg");
      expect(result.keys).to.include("version");
      expect(result.keys).to.include("id");
    });
  });

  describe("Security Limits Enforcement", () => {
    it("should reject patterns exceeding maximum length", () => {
      const longPattern = "a".repeat(8193); // Exceeds default limit of 1000
      
      expect(() => {
        wildcardToRegExp(longPattern);
      }).to.throw("Pattern length 8193 exceeds limit 8192");
    });

    it("should reject patterns with too many wildcards", () => {
      const wildcardPattern = "*".repeat(21); // Exceeds default limit of 20
      
      expect(() => {
        wildcardToRegExp(wildcardPattern);
      }).to.throw("Wildcard count 21 exceeds limit 20");
    });

    it("should reject patterns with too many parameters", () => {
      const paramPattern = Array(51).fill(":param").join("/"); // Exceeds default limit of 50
      
      expect(() => {
        wildcardToRegExp(paramPattern);
      }).to.throw("Parameter count 51 exceeds limit 50");
    });

    it("should allow patterns within security limits", () => {
      const validPattern = "/api/" + ":param".repeat(10) + "/" + "*".repeat(5);
      
      expect(() => {
        const result = wildcardToRegExp(validPattern);
        expect(result).to.have.property("reg");
      }).to.not.throw();
    });
  });

  describe("Regex Error Handling", () => {
    it("should handle malformed regex patterns gracefully", () => {
      // This test verifies the try-catch error handling
      const problematicPattern = ":param" + "[".repeat(100); // Unmatched brackets
      
      expect(() => {
        const result = wildcardToRegExp(problematicPattern);
        // Should either succeed with escaped brackets or fall back to exact match
        expect(result).to.have.property("reg");
      }).to.not.throw();
    });
  });

  describe("Performance Benchmarks", () => {
    it("should process normal patterns quickly", () => {
      const normalPatterns = [
        "/users/:id",
        "/api/v1/users/:userId/posts/:postId",
        "/static/*",
        "/api/:version/*/data/:id?",
        "/:category/:subcategory/:item"
      ];
      
      normalPatterns.forEach(pattern => {
        const start = performance.now();
        const result = wildcardToRegExp(pattern);
        const end = performance.now();
        
        expect(end - start).to.be.below(10); // Should be very fast for normal patterns
        expect(result).to.have.property("reg");
      });
    });

    it("should maintain performance under moderate complexity", () => {
      const moderatePattern = "/api/:v1/:v2/:v3/:v4/:v5/*/*/*/:final";
      
      const iterations = 100;
      const start = performance.now();
      
      for (let i = 0; i < iterations; i++) {
        wildcardToRegExp(moderatePattern + i);
      }
      
      const end = performance.now();
      const avgTime = (end - start) / iterations;
      
      expect(avgTime).to.be.below(5); // Average under 5ms per pattern
    });
  });

  describe("Functional Verification", () => {
    it("should maintain correct wildcard matching after security fixes", () => {
      const testCases = [
        {
          pattern: "/users/:id",
          input: "/users/123",
          expected: { id: "123" }
        },
        {
          pattern: "/api/*/users/:userId",
          input: "/api/v1/users/456",
          expected: { undefined: "v1", userId: "456" }
        },
        {
          pattern: "/files/*/:filename",
          input: "/files/documents/report.pdf",
          expected: { undefined: "documents", filename: "report.pdf" }
        }
      ];
      
      testCases.forEach(({ pattern, input, expected }) => {
        const result = wildcardSearch(input, pattern);
        expect(result).to.deep.equal(expected);
      });
    });

    it("should handle edge cases correctly", () => {
      // Empty pattern
      expect(() => wildcardToRegExp("")).to.not.throw();
      
      // Null/undefined patterns
      expect(() => wildcardToRegExp(null)).to.not.throw();
      expect(() => wildcardToRegExp(undefined)).to.not.throw();
      
      // Simple patterns without parameters
      const result = wildcardToRegExp("/static/files");
      expect(result.keys).to.have.length(0);
      expect(result.reg.test("/static/files")).to.be.true;
    });
  });

  describe("Attack Pattern Resistance", () => {
    it("should resist catastrophic backtracking patterns", () => {
      const attackPatterns = [
        // Nested quantifiers
        ":param(" + "(".repeat(20) + "test" + ")".repeat(20),
        // Alternation with overlapping patterns
        ":a|:ab|:abc" + "?".repeat(10),
        // Multiple optional groups
        "(:a)?(:b)?(:c)?" + "?".repeat(10),
        // Complex nested groups
        "(:param(" + ".*".repeat(5) + "))" + "?".repeat(5)
      ];
      
      attackPatterns.forEach((pattern, _index) => {
        const start = performance.now();
        
        try {
          const result = wildcardToRegExp(pattern);
          const end = performance.now();
          
          // Should complete within reasonable time
          expect(end - start).to.be.below(100);
          expect(result).to.have.property("reg");
        } catch (error) {
          const end = performance.now();
          
          // If blocked by security limits, should fail quickly
          expect(end - start).to.be.below(50);
          expect(error.message).to.match(/(exceeds limit|too long|too many)/i);
        }
      });
    });
  });
});
