const ENSJS = require("ethereum-ens");

class ENS {
  constructor({ provider, resolver }) {
    this.provider = provider;
    this.resolver = resolver;
  }

  async deployNewENSRegistry(from) {
    const ENSRegistry = this.resolver.require("@ensdomains/ens/ENSRegistry");
    ENSRegistry.setProvider(this.provider);
    const ensRegistry = await ENSRegistry.new({ from });
    return ensRegistry;
  }

  async ensureRegistryExists(from) {
    // See if registry exists on network by resolving an arbitrary address
    // If no registry exists then deploy one
    try {
      await this.ensjs.owner("0x0");
    } catch (error) {
      const noRegistryFound =
        error.message ===
        "This contract object doesn't have address set yet, please set an address first.";
      if (noRegistryFound) {
        const registry = await this.deployNewENSRegistry(from);
        this.setENSJS(registry.address);
      } else {
        throw error;
      }
    }
  }

  async ensureResolverExists(from) {
    // See if the resolver is set, if not then set it
    let resolvedAddress, publicResolver;
    try {
      resolvedAddress = await this.ensjs.resolver(name).addr();
      return { resolvedAddress };
    } catch (error) {
      if (error.message !== "ENS name not found") throw error;
      const PublicResolver = this.resolver.require(
        "@ensdomains/resolver/PublicResolver"
      );
      PublicResolver.setProvider(this.provider);
      publicResolver = await PublicResolver.new(this.currentRegistryAddress, {
        from
      });
      await this.ensjs.setResolver(name, publicResolver.address, { from });
      return { resolvedAddress: null };
    }
  }

  async register({ address, name, from, registryAddress }) {
    this.currentRegistryAddress = registryAddress;
    this.setENSJS(registryAddress);

    await this.ensureRegistryExists(from);

    // Find the owner of the name and compare it to the "from" field
    const nameOwner = await this.ensjs.owner(name);
    // Future work:
    // Handle case where there is no owner and we try to register it for the user
    // if (nameOwner === "0x0000000000000000000000000000000000000000") {
    //   this.attemptNameRegistration();
    // }

    if (nameOwner !== from) {
      const message =
        `The default address or address provided in the "from" ` +
        `field for registering does not own the specified ENS name. The ` +
        `"from" field address must match the owner of the name.` +
        `\n> Failed to register ENS name ${name}` +
        `\n> Address in "from" field - ${from}` +
        `\n> Current owner of '${name}' - ${nameOwner}`;
      throw new Error(message);
    }

    const { resolvedAddress } = await this.ensureResolverExists(from);

    // If the resolver points to a different address or is not set,
    // then set it to the specified address
    if (resolvedAddress !== address) {
      await this.ensjs.resolver(name).setAddr(address);
    }
  }

  setENSJS(registryAddress) {
    this.ensjs = new ENSJS(this.provider, registryAddress);
  }
}

module.exports = ENS;
