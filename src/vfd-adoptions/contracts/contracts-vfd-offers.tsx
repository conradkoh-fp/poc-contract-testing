import { usePluginConfig } from "../../vfd/hooks/usePluginConfig";
/**
 * This file shows an example of how we can statically check interfaces from a library to detect breaking changes
 */
interface UsePluginConfigExpected {
  data: {
    isItemLevelEnabled: boolean;
    // newProperty: boolean; //uncomment this line to test that checks will fail
  };
}

type UsePluginConfigActual = ReturnType<typeof usePluginConfig>;

// =============================================
//  HELPERS
// =============================================
type IsExtensionOf<A, B> = A extends B ? true : false; //type true if A extends B
type IsMutualExtensionOf<A, B> = IsExtensionOf<A, B> extends true ? IsExtensionOf<B, A> : false; //equivalence is established by mutual extension
type AssertExtension<A, B extends A> = any; //helper that requires A to be a supertype of B. note that the resulting type does not matter
type AssertTrue<Statement extends true> = any; //helper to assert that a statement is true. note that the resulting type does not matter

// =============================================
//  STATIC TYPE TESTS - CHECKS AND ASSERTIONS
// =============================================

//----------------------------------------------
// [TYPE] Interface Equality
//- - - - - - - - - - - - - - - - - - - - - - -
// This kind of test is mainly important if you want to ensure that no other properties except the expected ones are present
// NOTE: This does not prevent runtime addition of new properties. For runtime strictness, use a library like zod.
//----------------------------------------------

/**
 * [Option 1]: Test that the are equal by using the IsMutualExtensionOf type
 * Pro: Easy to write test
 * Con: The error will highlight the whole line
 */
type TestInferfacesEqualV1 = AssertTrue<IsMutualExtensionOf<UsePluginConfigActual, UsePluginConfigExpected>>;

/**
 * [Option 2]: Test that the are equal by separating the two assertions
 * Pro: The error will show only in the violated section
 * Con: 2 statements must always be written
 */
type TestInferfacesEqualV2 =
  // Assert that the actual interface is a supertype of the expected interface
  | AssertExtension<UsePluginConfigActual, UsePluginConfigExpected>
  // Assert that the expected interface is a supertype of the actual interface
  | AssertExtension<UsePluginConfigExpected, UsePluginConfigActual>;
